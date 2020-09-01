import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { StyleService } from 'src/app/core/services/style.service';
import { CategoryState } from 'src/app/core/services/states/category.state';

import * as Utils from 'src/app/core/helpers/util';
import { of } from 'rxjs';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  activePage: string;
  filterVisible = false;

  categories: any;
  category: any;

  // Image Page Params
  categoryName: any;
  productId: any;
  styleId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private styleService: StyleService,
    private categoryState: CategoryState,
  ) { }

  ngOnInit() {
    this.watchRouter();
    this.subs.sink = this.categoryState.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.subs.sink = this.categoryState.getCategory().subscribe(res => {
      this.category = res;
    });
  }

  navigate(categoryName?: string) {
    if (categoryName) {
      this.router.navigate([`${categoryName.toLowerCase()}`]);
    } else {
      this.router.navigate(['']);
    }
  }

  watchRouter() {
    this.subs.sink = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if (!child) { return of(null); }
        this.productId = child.snapshot.params.product_id;
        this.categoryName = child.snapshot.params.category_name;
        if (child.snapshot.data.page) {
          return child.snapshot.data.page;
        }
      })
    ).subscribe((page: string) => {
      this.activePage = page;
      if (this.activePage === 'category') {
        this.filterVisible = true;
      } else {
        this.filterVisible = false;
      }
    });

    this.subs.sink = this.activatedRoute.queryParams.subscribe(params => {
      this.styleId = params.style;
    });
  }

  backToList() {
    this.router.navigate([this.category.category_name.toLowerCase()]);
  }

  closeWindow(platform) {
    if (platform == 'mobile') {
      this.router.navigate([`product/${this.categoryName}/${this.productId}`], { queryParams: { style: this.styleId}});
    } else {
      window.close();
    }
  }

  openSideMenu() {
    this.styleService.openSidemenu();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

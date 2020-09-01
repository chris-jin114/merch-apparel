import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ErrorService } from 'src/app/core/services/error.service';
import { Product } from 'src/app/shared/models/product/product.model';

import { ProductState } from 'src/app/core/services/states/product.state';
import { FilterState } from 'src/app/core/services/states/filter.state';
import { Filter } from 'src/app/shared/models/filter.model';
import { CategoryState } from 'src/app/core/services/states/category.state';
import { Category } from 'src/app/shared/models/category.interface';



@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  products$ = new BehaviorSubject<Product[]>([]);

  curFilter: Filter;
  category: Category;

  errorType = '';
  errorMsg = '';

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
    grabCursor: 'true'
  };
  
  constructor(
    private productState: ProductState,
    private filterState: FilterState,
    private categoryState: CategoryState,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.getCurrentFilter();
    this.getProducts();
    this.getCategory();
    this.watchHttpError();
  }

  watchHttpError() {
    this.subs.sink = this.errorService.getErrorType().subscribe(res => {
      this.errorType = res;
    });
    this.subs.sink = this.errorService.getErrorMsg().subscribe(res => {
      this.errorMsg = res;
    });
  }

  getCategory() {
    this.subs.sink = this.categoryState.getCategory().subscribe(res => {
      this.category = res;
    });
  }

  getCurrentFilter() {
    this.subs.sink = this.filterState.getCurrentFilter().subscribe(filter => {
      this.curFilter = filter;
    });
  }

  getProducts() {
    this.subs.sink = this.productState.getProducts().subscribe((products: Product[]) => {
      this.products$.next(products);
    });
  }

  getProducts$() {
    return this.products$.asObservable().pipe(first(products => products !== null));
  }


  retryFailedRequest() {
    location.reload();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

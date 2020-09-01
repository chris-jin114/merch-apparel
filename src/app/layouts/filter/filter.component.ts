import { Component, OnInit, OnDestroy, AfterViewInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Router, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { SubSink } from 'subsink';

import { ProductApi } from 'src/app/core/services/apis/product.api';

import { FilterState } from 'src/app/core/services/states/filter.state';
import { ProductState } from 'src/app/core/services/states/product.state';
import { CategoryState } from 'src/app/core/services/states/category.state';

import { FilterFacade } from 'src/app/core/services/facades/filter.facade';

import { Attribute, Filter } from 'src/app/shared/models/filter.model';
import { Category } from 'src/app/shared/models/category.interface';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';

import * as Utils from 'src/app/core/helpers/util';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  pagination: Pagination;

  isFilterApplied = false;
  isOpenedWeight = false;

  hoverColor = '';

  category: Category;
  filter: Filter;
  curFilter: Filter;
  sortDir = true;
  sortField = 'Popularity';

  isOpenedNav = false;
  isOpenedColor = false;
  isOpenedSize = false;
  isOpenedStyle = false;
  isOpenedSortby = false;

  isFilterUpdating = false;

  constructor(
    private productApi: ProductApi,
    private productState: ProductState,
    private filterState: FilterState,
    private categoryState: CategoryState,
    private filterFacade: FilterFacade,
  ) {}

  ngOnInit() {
    this.subs.sink = this.categoryState.getCategory().subscribe(category => {
      this.category = category;
    });
    this.subs.sink = this.filterState.getFilter().subscribe(filter => {
      this.filter = filter;
    });
    this.subs.sink = this.filterState.getCurrentFilter().subscribe(filter => {
      this.curFilter = filter;
    });
    this.subs.sink = this.filterState.getPagination().subscribe(pagination => {
      this.pagination = pagination;
    });
    this.subs.sink = this.filterState.getFilterApplied().subscribe(res => {
      this.isFilterApplied = res;
    });
    this.subs.sink = this.filterState.getFilterUpdating().subscribe(res => {
      this.isFilterUpdating = res;
    });

    this.getSortByFilter();
  }

  getSortByFilter() {
    this.subs.sink = this.filterState.getSortDir().subscribe(res => {
      this.sortDir = res;
    });
    this.subs.sink = this.filterState.getSortField().subscribe(res => {
      this.sortField = res;
    });
  }
  flip() {
    if (this.isOpenedNav) {
      this.isOpenedNav = false;
      this.filterFacade.setOpenedNav(false);
      // document.getElementById('sort-overlay').style.display = 'none';
    } else {
      this.isOpenedNav = true;
      this.filterFacade.setOpenedNav(true);
      // document.getElementById('sort-overlay').style.display = 'block';
    }
  }

  clearAll() {
    this.filterState.setCurrentFilter(new Filter());
    this.isOpenedNav = false;
    this.isOpenedColor = false;
    this.isOpenedStyle = false;
    this.isOpenedSize = false;
    this.isOpenedSortby = false;
    this.filterFacade.setOpenedNav(false);
    this.updateProducts(1);
  }

  setSortField(field) {
    const page = this.pagination.meta.current_page;
    if (field === this.sortField) {
      this.filterState.setSortDir(!this.sortDir);
    } else {
      this.filterState.setSortDir(true);
      this.filterState.setSortField(field);
    }
    this.updateProducts(page);
  }

  closeFilter() {
    this.isOpenedNav = false;
    this.filterFacade.isOpenedNav.next(false);
    // document.getElementById('sort-overlay').style.display = 'none';
  }

  next() {
    if (this.pagination.links.next) {
      const page = this.pagination.meta.current_page + 1;
      this.updateProducts(page);
    }
  }

  prev() {
    if (this.pagination.links.prev) {
      const page = this.pagination.meta.current_page - 1;
      this.updateProducts(page);
    }
  }

  updateProducts(page) {
    this.productState.setProducts(null);
    this.filterState.isUpdating.next(true);
    this.subs.sink = this.productApi.getProductsByCategory(
      this.category.category_uuid, this.sortDir, page, this.curFilter, this.sortField).subscribe(res => {

      this.filterState.isUpdating.next(false);
      this.productState.setProducts(res.data);
      this.filterState.setFilter(new Filter().deserialize({ ...res.filters, category: this.category }));
      this.filterState.setPagination(new Pagination().deserialize({ links: res.links, meta: res.meta }));
    });
  }

  changeStatus(type: string) {
    const point = Utils.ucFirst(type);
    this[`isOpened${point}`] = !this[`isOpened${point}`];
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

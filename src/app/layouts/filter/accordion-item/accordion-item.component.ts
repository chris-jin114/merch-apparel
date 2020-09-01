import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

import { ProductApi } from 'src/app/core/services/apis/product.api';

import { FilterState } from 'src/app/core/services/states/filter.state';
import { ProductState } from 'src/app/core/services/states/product.state';
import { CategoryState } from 'src/app/core/services/states/category.state';

import { FilterFacade } from 'src/app/core/services/facades/filter.facade';
import { AccordionFacade } from 'src/app/core/services/facades/accordion.facade';

import { Attribute, Filter } from 'src/app/shared/models/filter.model';
import { Category } from 'src/app/shared/models/category.interface';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';

@Component({
  selector: 'accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit, OnDestroy {

  @Input() item: Attribute;
  @Input() flag: boolean;
  @Input() type: string;

  private subs = new SubSink();

  isFilterUpdating = false;

  category: Category;
  curFilter: Filter;
  nameAsc = true;

  constructor(
    private productApi: ProductApi,
    private productState: ProductState,
    private filterState: FilterState,
    private categoryState: CategoryState,
    private filterFacade: FilterFacade,
    private accordionFacade: AccordionFacade
  ) { }

  ngOnInit() {
    this.subs.sink = this.categoryState.getCategory().subscribe(category => {
      this.category = category;
    });

    this.subs.sink = this.filterState.getCurrentFilter().subscribe(filter => {
      this.curFilter = filter;
    });

    this.subs.sink = this.filterState.getSortDir().subscribe(asc => {
      this.nameAsc = asc;
    });

    this.subs.sink = this.filterState.getFilterUpdating().subscribe(res => {
      this.isFilterUpdating = res;
    });
  }

  clickItem() {
    if (!this.isFilterUpdating) {
      this.accordionFacade.setItem(this.item, this.type);
      this.updateProducts();
    }
  }

  isChecked(): boolean {
    return this.accordionFacade.isChecked(this.item, this.type);
  }

  updateProducts() {
    this.productState.setProducts(null);
    this.filterState.isUpdating.next(true);
    this.subs.sink = this.productApi.getProductsByCategory(
      this.category.category_uuid, this.nameAsc, 1, this.curFilter).subscribe(res => {

      this.filterState.isUpdating.next(false);
      this.productState.setProducts(res.data);
      this.filterState.setFilter(new Filter().deserialize({ ...res.filters, category: this.category }));
      this.filterState.setPagination(new Pagination().deserialize({ links: res.links, meta: res.meta }));
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

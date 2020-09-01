import { Injectable } from '@angular/core';

import { FilterState } from './../states/filter.state';
import { CategoryState } from '../states/category.state';

import {  Attribute } from 'src/app/shared/models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class AccordionFacade {

  constructor(
    private filterState: FilterState,
    private categoryState: CategoryState,
  ) { }

  setItem(item: Attribute, itemType: string) {
    const currentFilter = this.filterState.currentFilter.getValue();
    const category = this.categoryState.category.getValue();
    const type = itemType.toLowerCase();
    const index = currentFilter[type].findIndex(value => item.attribute_uuid == value.attribute_uuid);

    currentFilter.category = category.category_uuid;

    if (index == -1) {
      currentFilter[type].push(item);
    } else {
      currentFilter[type].splice(index, 1);
    }
    this.filterState.setCurrentFilter(currentFilter);
  }

  isChecked(item: any, itemType: string): boolean {
    const type = itemType.toLowerCase();
    const currentFilter = this.filterState.currentFilter.getValue();
    return currentFilter[type].some(x => x.attribute_uuid === item.attribute_uuid);
  }
}

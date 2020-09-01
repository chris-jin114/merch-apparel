import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/filter.model';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';

@Injectable({
  providedIn: 'root'
})

export class FilterState {

  filter = new BehaviorSubject<Filter>(new Filter());

  currentFilter = new BehaviorSubject<Filter>(new Filter());
  pagination = new BehaviorSubject<Pagination>(new Pagination());
  filterApplied = new BehaviorSubject<boolean>(false);

  sortDir = new BehaviorSubject<boolean>(true);
  sortField = new BehaviorSubject<string>('popularity');

  isUpdating = new BehaviorSubject<boolean>(false);

  constructor() { }

  setSortDir(isAsceding: boolean): void {
    this.sortDir.next(isAsceding);
  }

  getSortDir(): Observable<boolean> {
    return this.sortDir.asObservable();
  }

  setSortField(field: string): void {
    this.sortField.next(field);
  }

  getSortField(): Observable<string> {
    return this.sortField.asObservable();
  }

  getFilterUpdating(): Observable<boolean> {
    return this.isUpdating.asObservable();
  }
  
  setFilterApplied(isFilterApplied: boolean) {
    this.filterApplied.next(isFilterApplied);
  }

  getFilterApplied(): Observable<boolean> {
    return this.filterApplied.asObservable();
  }

  checkFilterEmpty(currentFilter: Filter) {
    return currentFilter.color.length > 0 || currentFilter.size.length > 0 ||
    currentFilter.style.length > 0 || currentFilter.weight.length > 0;
  }

  setCurrentFilter(currentFilter: Filter): void {
    this.currentFilter.next(currentFilter);
    this.setFilterApplied(this.checkFilterEmpty(currentFilter));
  }

  getCurrentFilter(): Observable<Filter> {
    return this.currentFilter.asObservable();
  }

  setFilter(filter: Filter) {
    this.filter.next(filter);
  }

  getFilter(): Observable<Filter> {
    return this.filter.asObservable();
  }

  setPagination(pagination: Pagination) {
    this.pagination.next(pagination);
  }

  getPagination(): Observable<Pagination> {
    return this.pagination.asObservable();
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../../shared/models/category.interface';
import { CategoryApi } from '../apis/category.api';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryState {

  category = new BehaviorSubject<Category>(new Category());

  categories: Observable<Category[]>;

  constructor(
    private categoryApi: CategoryApi,
  ) {
    this.categories = this.categoryApi.getCategories().pipe(shareReplay(1));
  }
  

  setCategory(category: Category) {
    this.category.next(category);
  }

  getCategory(): Observable<Category> {
    return this.category.asObservable();
  }


  getCategories() {
    return this.categories;
  }
}

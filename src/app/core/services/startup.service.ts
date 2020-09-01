import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/category.interface';
import { CategoryState } from '../services/states/category.state';

@Injectable({
  providedIn: "root"
})
export class StartupService {
  categories: Category[];

  constructor(private categoryState: CategoryState) {}

  load() {
    this.categories = null;
    return this.categoryState.getCategories().toPromise().then(categories => {
      this.categories = categories;
    }).catch(err => Promise.resolve());
  }
}

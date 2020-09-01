import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.interface';
import { Filter } from 'src/app/shared/models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryApi {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const api = `apparel/categories`;
    return this.httpClient.get<any>(api).pipe(map(res => res.data.filter(x => x.category_name.toLowerCase() !== 'organic')));
  }
}

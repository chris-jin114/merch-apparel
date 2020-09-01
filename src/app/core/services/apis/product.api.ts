import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Filter } from 'src/app/shared/models/filter.model';
import { Category } from 'src/app/shared/models/category.interface';
import { Bootstrap } from 'src/app/shared/models/product/bootstrap.model';
import { Product } from 'src/app/shared/models/product/product.model';

import { ErrorService } from 'src/app/core/services/error.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  getBootstrap(): Observable<Bootstrap> {
    return this.httpClient.get<any>(`apparel/bootstrap`).pipe(map(res => {
      console.log(res);
      const result = new Bootstrap().deserialize(res.data);
      return result;
    }));
  }

  getInstImages(random, latest?) {
    const api = `core/social/instagram`;
    let params = new HttpParams();
    params = params.append('random', random);
    if (latest) {
      params = params.append('latest', latest);
    }

    return this.httpClient.get<any>(api, { params }).pipe(map(res => {
      return res.data;
    }));
  }

  getProductById(uuid: string): Observable<Product> {
    return this.httpClient.get<any>(`apparel/products/${uuid}`).pipe(map(res => {
      return new Product().deserialize(res.data);
    }));
  }

  getProductsByCategory(categoryUuid: string, isAsc: boolean, page = 1, filter?: Filter, sortField?: string) {
    const api = `apparel/category/${categoryUuid}`;
    let params = new HttpParams();
    params = params.append('sort_dir', isAsc ? 'asc' : 'desc');
    params = params.append('per_page', '18');
    params = params.append('page', `${page}`);
    params = params.append('sort_field', 'popularity');
    if (filter) {
      params = this.parseFilterParams(params, filter);
    }
    if (sortField) {
      params = params.set('sort_field', sortField);
    }
    return this.httpClient.get<any>(api, { params }).pipe(map(res => {
      res.data = res.data.map(x => new Product().deserialize(x));
      return res;
    }));
  }

  parseFilterParams(params: HttpParams, filter: Filter): HttpParams {
    if (filter.color.length > 0) {
      const arr = [];
      for (const item of filter.color) {
        arr.push(item.attribute_uuid);
      }
      params = params.append('color', arr.join('\\'));
    }

    if (filter.weight.length > 0) {
      const arr = [];
      for (const item of filter.weight) {
        arr.push(item.attribute_uuid);
      }
      params = params.append('weight', arr.join('\\'));
    }

    if (filter.size.length > 0) {
      const arr = [];
      for (const item of filter.size) {
        arr.push(item.attribute_uuid);
      }
      params = params.append('size', arr.join('\\'));
    }

    if (filter.style.length > 0) {
      const arr = [];
      for (const item of filter.style) {
        arr.push(item.attribute_uuid);
      }
      params = params.append('style', arr.join('\\'));
    }

    return params;
  }
}

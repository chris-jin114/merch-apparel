import { Injectable } from '@angular/core';
import { ProductApi } from '../apis/product.api';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ProductState } from '../states/product.state';

import { Product } from 'src/app/shared/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  constructor(
    private productApi: ProductApi,
    private productState: ProductState,
  ) {}

  setProduct(product: Product) {
    this.productState.setProduct(product);
  }

  getProduct$(): Observable<Product> {
    return this.productState.getProduct$().pipe(filter(x => x != null));
  }

  getProducts$(): Observable<Product[]> {
    return this.productState.getProducts();
  }

  loadProduct(uuid: string) {
    this.productApi.getProductById(uuid).subscribe((res: Product) => {
      this.productState.setProduct(res);
    });
  }
}

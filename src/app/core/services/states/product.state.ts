import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bootstrap } from 'src/app/shared/models/product/bootstrap.model';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';
import { ProductSize } from 'src/app/shared/models/product/product-size.model';
import { Category } from 'src/app/shared/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductState {

  private bootstrap$ = new BehaviorSubject<Bootstrap>(null);
  private product$ = new BehaviorSubject<Product>(null);
  private products$ = new BehaviorSubject<Product[]>(null);

  constructor() { }

  setBootstrap(bootstrap: Bootstrap) {
    this.bootstrap$.next(bootstrap);
  }

  getBootstrap$(): Observable<Bootstrap> {
    return this.bootstrap$.asObservable();
  }

  setProduct(product: Product) {
    this.product$.next(product);
  }

  getProduct$(): Observable<Product> {
    return this.product$.asObservable();
  }

  setProducts(products: Product[]) {
    this.products$.next(products);
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

import { CategoryState } from 'src/app/core/services/states/category.state';
import { Product } from 'src/app/shared/models/product/product.model';
import { Category } from 'src/app/shared/models/category.interface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})

export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() categoryName: string;
  @Input() type = 'normal';
  @Input() color: any;

  private subs = new SubSink();

  hoverColor: false;
  imageLoading = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  viewProductDetail(product: Product) {
    let queryParams = {};
    if (product.current_style) {
      queryParams = { style: product.current_style.row_uuid };
    }
    this.router.navigate([`/product/${this.categoryName.toLowerCase()}/${product.product_uuid}`], { queryParams });
  }

  onHoverColorChange(event) {
    if (event) {
      this.imageLoading = true;
    }
    this.hoverColor = event;
  }
  imageLoaded() {
    this.imageLoading = false;
  }
}

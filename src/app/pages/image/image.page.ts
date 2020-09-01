import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

import { ErrorService } from 'src/app/core/services/error.service';
import { ProductFacade } from 'src/app/core/services/facades/product.facade';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';

import * as Utils from 'src/app/core/helpers/util';

@Component({
  selector: 'image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit, OnDestroy {
  @ViewChild('imageView', { static: false }) imageView: ElementRef;
  @ViewChild('mobileImg', { static: false }) mobileImg: ElementRef;
  @ViewChild('imageContainer', { static: false }) imageContainer: ElementRef;
  // @ViewChild('myPinch', { static: false }) myPinch;
  private subs = new SubSink();

  errorType: any;
  errorMsg: any;
  
  orgWidth: any;
  orgHeight: any;

  product: Product;
  categoryName: string;
  productId: string;

  previewStyle: ProductStyle;
  sideIndex = 0;

  scale = 0;

  imageLoading = false;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
    grabCursor: 'true',
  };

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private productFacade: ProductFacade,
    private errorService: ErrorService,
    ) {}

  ngOnInit() {
    this.watchHttpError();
    this.watchRouter();
  }

  watchRouter() {
    this.subs.sink = this.activatedRoute.params.subscribe(params => {
      console.log({params});
      this.categoryName = params.category_name;
      this.productId = params.product_id;
      this.productFacade.loadProduct(this.productId);
      this.subs.sink = this.productFacade.getProduct$().subscribe(product => {
        this.product = product;
        console.log(this.product);
        this.titleService.setTitle(`Arena Apparel | ${Utils.ucFirst(this.categoryName)} | ${this.product.product_name} | Image`);

        this.previewStyle = this.product.product_style[0];
        const style = this.activatedRoute.snapshot.queryParams.style;
        if (style) {
          const res = this.product.product_style.find(item => item.row_uuid == style);
          this.previewStyle = res ? res : this.previewStyle;
        }
      });
    });
    this.subs.sink = this.activatedRoute.queryParams.subscribe(queryParams => {
      const style = queryParams.style;
      this.sideIndex = queryParams.side;
      console.log(this.sideIndex);
    });
  }

  imageLoaded() {
    this.imageLoading = false;
  }

  onClickSide(side) {
    if (this.sideIndex != side) {
      this.sideIndex = side;
      this.imageLoading = true;
    }
  }

  onSliderChange() {
    const prevScrollWidth = this.mobileImg.nativeElement.scrollWidth;
    const prevScrollHeight = this.mobileImg.nativeElement.scrollHeight;
    const prevScrollLeft = this.imageContainer.nativeElement.scrollLeft;
    const prevScrollTop = this.imageContainer.nativeElement.scrollTop;
    const clientWidth = this.imageContainer.nativeElement.clientWidth;
    const clientHeight = this.imageContainer.nativeElement.clientHeight;

    this.mobileImg.nativeElement.width = clientWidth + (2000 - clientWidth) * (this.scale / 100);
    this.mobileImg.nativeElement.height = clientHeight + (2000 - clientHeight) * (this.scale / 100);
    this.mobileImg.nativeElement.style.top = 0;
    this.mobileImg.nativeElement.style.left = 0;

    const curScrollWidth = this.imageContainer.nativeElement.scrollWidth;
    const curScrollHeight = this.imageContainer.nativeElement.scrollHeight;

    this.imageContainer.nativeElement.scrollLeft =
      (prevScrollLeft + clientWidth / 2) *  (curScrollWidth / prevScrollWidth) - clientWidth / 2;
    this.imageContainer.nativeElement.scrollTop =
      (prevScrollTop + clientHeight / 2) * (curScrollHeight / prevScrollHeight) - clientHeight / 2;
  }

  selectStyle(style) {
    if (this.previewStyle != style) {
      this.previewStyle = style;
      this.imageLoading = true;
    }
  }
  watchHttpError() {
    this.subs.sink = this.errorService.getErrorType().subscribe(res => {
      this.errorType = res;
    });
    this.subs.sink = this.errorService.getErrorMsg().subscribe(res => {
      this.errorMsg = res;
    });
  }

  scrollToHorizontalCenter() {
    try {
      this.imageView.nativeElement.scrollLeft = (1896 - this.imageView.nativeElement.clientWidth) / 2;
    } catch (err) {
      console.log(err);
    }
  }

  retryFailedRequest() {
    location.reload();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

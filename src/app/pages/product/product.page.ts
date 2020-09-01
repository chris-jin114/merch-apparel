import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SubSink } from 'subsink';

import { ProductState } from 'src/app/core/services/states/product.state';
import { CategoryState } from 'src/app/core/services/states/category.state';
import { ProductFacade } from 'src/app/core/services/facades/product.facade';

import { Product } from 'src/app/shared/models/product/product.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';
import { Category } from 'src/app/shared/models/category.interface';
import { ErrorService } from 'src/app/core/services/error.service';
import { BehaviorSubject } from 'rxjs';

import * as Utils from 'src/app/core/helpers/util';

@Component({
    selector: 'product',
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
    @ViewChild('imageView', { static: false }) imageView: ElementRef;
    @ViewChild('mobileImg', { static: false }) mobileImg: ElementRef;
    @ViewChild('imageContainer', { static: false }) imageContainer: ElementRef;

    private subs = new SubSink();

    product: Product;
    defaultStyle: ProductStyle;
    previewStyle: ProductStyle;

    hoverColor: string;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 'auto',
        grabCursor: 'true'
    };

    sideIndex = 0;
    selectedSideIndex = 0;

    category: Category;
    productId: string;

    categories: Category[];

    errorType = '';
    errorMsg = '';

    imageLoading = true;

    scale = 0;

    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productState: ProductState,
        private categoryState: CategoryState,
        private productFacade: ProductFacade,
        private errorService: ErrorService,
    ) { }

    ngOnInit() {
        this.watchCategory();
        this.watchRouter();
        this.watchHttpError();
    }

    watchCategory() {
        this.subs.sink = this.categoryState.getCategory().subscribe(category => {
            this.category = category;
        });
        this.subs.sink = this.categoryState.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }
    watchRouter() {
        this.subs.sink = this.activatedRoute.params.subscribe(params => {
            this.categoryState.setCategory(this.findCategoryByName(params.category_name));
            this.productId = params.product_id;
            this.productFacade.loadProduct(this.productId);
            this.subs.sink = this.productFacade.getProduct$().subscribe(product => {
                this.product = product;
                this.titleService.setTitle(`Arena Apparel | ${Utils.ucFirst(this.category.category_name)} | ${this.product.product_name}`);
                this.defaultStyle = this.product.product_style[0];
                const style = this.activatedRoute.snapshot.queryParams.style;
                if (style) {
                    const res = this.product.product_style.find(item => item.row_uuid == style);
                    this.defaultStyle = res ? res : this.defaultStyle;
                }
                this.previewStyle = this.defaultStyle;
            });
        });
        this.subs.sink = this.activatedRoute.queryParams.subscribe(queryParams => {
            const style = queryParams.style;
            if (style && this.product) {
                const res = this.product.product_style.find(item => item.row_uuid == style);
                this.defaultStyle = res ? res : this.defaultStyle;
                this.previewStyle = this.defaultStyle;
            }
        });
    }
    watchHttpError() {
        this.subs.sink = this.errorService.getErrorType().subscribe(res => {
            this.errorType = res;
        });
        this.subs.sink = this.errorService.getErrorMsg().subscribe(res => {
            this.errorMsg = res;
        });
    }

    showFullImage(styleId: string) {
        const url = `product/${this.category.category_name.toLowerCase()}/${this.productId}/image?style=${styleId}&side=${this.sideIndex}`;
        window.open(url);
    }

    showMobileFullImage(styleId: string) {
        const url = `product/${this.category.category_name.toLowerCase()}/${this.productId}/image`;
        console.log(this.productId);
        console.log(url);
        const queryParams = {
            style: styleId,
            side: this.sideIndex
        };
        this.router.navigate([url], { queryParams});
    }

    selectStyle(style) {
        this.defaultStyle = style;
        this.previewStyle = style;
    }

    onClickSide(side) {
        this.sideIndex = side;
        this.selectedSideIndex = side;
    }

    onSideOver(side) {
        if (this.sideIndex != side) {
            this.imageLoading = true;
            this.sideIndex = side;
        }
    }

    onSideOut() {
        this.sideIndex = this.selectedSideIndex;
    }

    onMouseOver(style) {
        if (this.previewStyle != style) {
            this.imageLoading = true;
            this.previewStyle = style;
        }
    }

    onMouseOut() {
        this.previewStyle = this.defaultStyle;
    }

    findCategoryByName(name) {
        return this.categories.find(x => x.category_name.toLowerCase() == name.toLowerCase());
    }

    backToList() {
        this.router.navigate([this.category.category_name.toLowerCase()]);
    }

    imageLoaded() {
        this.imageLoading = false;
    }
    retryFailedRequest() {
        location.reload();
    }

    ionViewWillLeave() {
        this.subs.unsubscribe();
        this.productState.setProduct(null);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}

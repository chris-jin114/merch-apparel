import { Deserializable } from '../deserializable';
import { ProductSize } from './product-size.model';
import { ProductStyle } from './product-style.model';
import { Price } from './price.model';

// tslint:disable: variable-name
export class Product implements Deserializable {
    product_uuid: string;
    product_name: string;
    product_description: string;
    product_price: number;
    product_sizes: string[];
    product_style: ProductStyle[];
    price?: Price; 
    prices?: Price[];
    related_products?: Product[];
    current_style?: ProductStyle;
    stamp_created?: number;
    stamp_created_by?: any;
    stamp_updated?: number;
    stamp_updated_by?: any;

    constructor() {
        this.product_style = new Array<ProductStyle>(0);
        this.related_products = new Array<Product>(0);
        this.prices = new Array<Price>(0);
        this.current_style = new ProductStyle();
        this.price = new Price();
    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.product_style = input.product_style.map(item => new ProductStyle().deserialize(item));
        if (input.price) {
            this.price = new Price().deserialize(input.price);
        }
        if (input.prices) {
            this.prices = input.prices.map(item => new Price().deserialize(item));
        }
        if (input.related_products) {
            this.related_products = input.related_products.map(item => new Product().deserialize(item));
        }
        if (input.current_style) {
            this.current_style = new ProductStyle().deserialize(input.current_style);
        } else {
            this.current_style = this.product_style[0];
        }
        return this;
    }
}
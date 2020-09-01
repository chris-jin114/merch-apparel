import { Deserializable } from '../deserializable';
import { Product } from './product.model';
import { environment } from 'src/environments/local';

// tslint:disable: variable-name
export class Bootstrap implements Deserializable {
    men: Product[];
    women: Product[];
    kids: Product[];
    accessories: Product[];

    constructor() {
        this.men = new Array<Product>(0);
        this.women = new Array<Product>(0);
        this.kids = new Array<Product>(0);
        this.accessories = new Array<Product>(0);
    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.men = input.men.map(product => new Product().deserialize(product));
        this.women = input.women.map(product => new Product().deserialize(product));
        this.kids = input.kids.map(product => new Product().deserialize(product));
        this.accessories = input.accessories.map(product => new Product().deserialize(product));
        return this;
    }
}

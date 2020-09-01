import { Deserializable } from '../deserializable';

// tslint:disable: variable-name
export class Price implements Deserializable {
    product_uuid: string;
    product_price: number;
    range_max: any;
    range_min: any;
    row_uuid: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
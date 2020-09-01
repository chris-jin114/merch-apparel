
import { Deserializable } from '../deserializable';

// tslint:disable: variable-name
export class ProductSize implements Deserializable{
    row_uuid: string;
    size_name: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
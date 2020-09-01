import { Deserializable } from '../deserializable';
import { Image } from './image.model';
import * as Utils from 'src/app/core/helpers/util';

// tslint:disable: variable-name
export class ProductStyle implements Deserializable {
    row_uuid: string;
    image: string;
    thumbnail: string;
    color_name: string;
    color_hash?: string[];
    flag_has_back: boolean;
    small_images?: Image[];
    original_images?: Image[];

    constructor() {
        this.small_images = new Array<Image>(0);
        this.original_images = new Array<Image>(0);
    }

    deserialize(input: any) {
        Object.assign(this, input);
        if (input.small_images) {
            this.small_images = input.small_images.map(img => new Image().deserialize(img));
        }
        if (input.original_images) {
            this.original_images = input.original_images.map(img => new Image().deserialize(img));
        }
        return this;
    }
}

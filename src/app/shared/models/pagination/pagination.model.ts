import { Deserializable } from '../deserializable';
import { Links } from './links.model';
import { Meta } from './meta.model';

export class Pagination {
    links: Links;
    meta: Meta;

    constructor() {
        this.links = new Links();
        this.meta = new Meta();
    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.links = new Links().deserialize(input.links);
        this.meta = new Meta().deserialize(input.meta);
        return this;
    }
}
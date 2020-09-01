import {Deserializable} from './deserializable';

// tslint:disable: variable-name
export class Attribute implements Deserializable {
    attribute_uuid: string;
    attribute_name: string;
    attribute_type: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class Filter implements Deserializable {
    color?: Attribute[];
    size?: Attribute[];
    style?: Attribute[];
    weight?: Attribute[];
    category: string;

    constructor() {
        this.style = new Array<Attribute>(0);
        this.weight = new Array<Attribute>(0);
        this.color = new Array<Attribute>(0);
        this.size = new Array<Attribute>(0);
    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.style = input.style.map(attr => new Attribute().deserialize(attr));
        this.weight = input.weight.map(attr => new Attribute().deserialize(attr));
        this.color = input.color.map(attr => new Attribute().deserialize(attr));
        this.size = input.size.map(attr => new Attribute().deserialize(attr));
        return this;
    }
}
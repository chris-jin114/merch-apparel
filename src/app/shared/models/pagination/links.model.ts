import { Deserializable } from '../deserializable';

export class Links implements Deserializable {
    first: string;
    last: string;
    prev: string;
    next: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

import { Deserializable } from '../deserializable';

// tslint:disable: variable-name
export class Meta implements Deserializable {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    constructor() {
        this.current_page = 1;
        this.from = 1;
        this.last_page = 1;
        this.to = 1;
        this.total = 0;
        this.per_page = 20;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
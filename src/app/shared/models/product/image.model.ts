import { Deserializable } from '../deserializable';
import { environment } from 'src/environments/local';

// tslint:disable: variable-name
export class Image implements Deserializable{
    file_uuid: string;
    file_name: string;
    file_type: string;
    full_url: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        if (input.url) {
            this.full_url = environment.cloudDomain + input.url;
        }
        return this;
    }
}

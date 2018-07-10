export class Payload {
    type: string;
    values: string[];
    constructor(type, values) {
        this.type = type;
        this.values = values;
    }
}

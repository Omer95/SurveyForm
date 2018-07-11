export class Payload {
    type: string;
    description: string;
    values: string[];
    constructor(type, desc, values) {
        this.type = type;
        this.description = desc;
        this.values = values;
    }
}

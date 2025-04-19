export class ConflictExceptionMessage {
    constructor(field: string) {
        this.field = field;
    }
    field: string;
}

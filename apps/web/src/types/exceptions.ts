export class CustomException extends Error {
    statusCode = 0;

    constructor(message: any) {
        super();
        this.message = message.message;
        this.name = message.error ? message.error : 'ForbiddenException';
        this.statusCode = message.statusCode ? message.statusCode : 0;
    }
}

export interface IError {
    error: string;
    message: string | string[];
    statusCode: number;
}

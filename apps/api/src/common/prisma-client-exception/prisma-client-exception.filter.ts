import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

import { ConflictExceptionMessage } from './exception.messages';

export const DatabaseException = {
    P2002: { message: 'AlreadyExist', status: HttpStatus.CONFLICT },
    P2003: { message: 'ForeignKeyConstraintFailed', status: HttpStatus.BAD_REQUEST },
    P2007: { message: 'ValidationError', status: HttpStatus.BAD_REQUEST },
    P2012: { message: 'MissingRequiredValue', status: HttpStatus.BAD_REQUEST },
    P2013: { message: 'MissingRequiredField', status: HttpStatus.BAD_REQUEST },
    P2015: { message: 'RecordCouldNotBeFound', status: HttpStatus.NOT_FOUND },
    P2019: { message: 'InputError', status: HttpStatus.BAD_REQUEST },
    P2020: { message: 'OutOfRange', status: HttpStatus.BAD_REQUEST },
    P2025: { message: 'RecordNotFound', status: HttpStatus.NOT_FOUND },
};

export type ErrorCodesStatusMapping = {
    [key: string]: number;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    private errorCodesStatusMapping: ErrorCodesStatusMapping = {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2003: HttpStatus.BAD_REQUEST,
        P2025: HttpStatus.NOT_FOUND,
    };

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const statusCode = this.errorCodesStatusMapping[exception.code];
        if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
            return super.catch(exception, host);
        }
        if (statusCode === HttpStatus.CONFLICT) {
            return super.catch(
                new HttpException(
                    { statusCode, message: new ConflictExceptionMessage(exception.meta.target as string) },
                    statusCode
                ),
                host
            );
        }

        // fallback
        const message = `[${exception.code}]: ${this.exceptionShortMessage(exception.message)}`;
        super.catch(new HttpException({ statusCode, message }, statusCode), host);
    }

    private exceptionShortMessage(message: string): string {
        const shortMessage = message.substring(message.indexOf('→'));

        return shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim();
    }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilterValidationError extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
        const message = this.exceptionShortMessage(exception.message);

        super.catch(new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message }, HttpStatus.BAD_REQUEST), host);
    }

    private exceptionShortMessage(message: string): string {
        const shortMessage = message.split('\n');
        return shortMessage[shortMessage.length - 1];
    }
}

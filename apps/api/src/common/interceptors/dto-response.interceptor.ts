import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    data: T;
}

@Injectable()
export class DtoResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private readonly transformType: Type) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        try {
            return next
                .handle()
                .pipe(map(data => plainToInstance(this.transformType, data, { excludeExtraneousValues: true })));
        } catch (e) {
            throw 'Failed to transform data';
        }
    }
}

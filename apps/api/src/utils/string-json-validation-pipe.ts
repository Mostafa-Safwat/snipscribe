import { ArgumentMetadata, BadRequestException, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export class StringJsonValidationPipe extends ValidationPipe {
    public async transform(value, metadata: ArgumentMetadata) {
        let obj = value;
        if (typeof value !== 'object') {
            obj = JSON.parse(value);
        }

        try {
            return await super.transform(obj, metadata);
        } catch (e) {
            console.log(e);
            if (e instanceof BadRequestException) {
                throw new UnprocessableEntityException(e.message);
            }
        }
    }
}

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Seeder } from './database/seeder';
import { SeederModule } from './database/seeder.module';

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const logger = appContext.get(Logger);
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(async () => {
                    logger.debug('Seeding complete!');
                })
                .catch(error => {
                    logger.error('Seeding failed!', error);
                    throw error;
                })
                .finally(async () => await appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();

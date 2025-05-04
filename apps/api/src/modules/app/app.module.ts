import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from '@/prisma.module';

import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { AuthModule } from '../auth/auth.module';
import { SummaryModule } from '../summary/summary.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            expandVariables: true,
            isGlobal: true,
            cache: true,
        }),
        PrismaModule,
        ScheduleModule.forRoot(),
        UserModule,
        AuthModule,
        SummaryModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}

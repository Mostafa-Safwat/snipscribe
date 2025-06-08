import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from '@/prisma.module';

import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { AuthModule } from '../auth/auth.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { MailerModule } from '../mailer/mailer.module';
import { NotificationModule } from '../notification/notification.module';
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
        FavoriteModule,
        MailerModule,
        NotificationModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}

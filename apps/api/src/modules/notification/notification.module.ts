import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma.module';

import { MailerModule } from '../mailer/mailer.module';
import { NotificationCronJob } from './notification.cron';
import { NotificationService } from './notification.service';

@Module({
    imports: [MailerModule, PrismaModule],
    providers: [NotificationCronJob, NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}

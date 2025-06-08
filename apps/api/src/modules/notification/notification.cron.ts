import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PrismaService } from '@/prisma.service';

import { NotificationService } from './notification.service';

@Injectable()
export class NotificationCronJob {
    private readonly logger = new Logger(NotificationCronJob.name);
    constructor(
        private readonly prisma: PrismaService,
        private readonly notificationService: NotificationService
    ) {}

    @Cron(`* * * * *`) //every minute
    async notifyAdmins() {
        this.logger.log('Notifying users about ready summaries');

        const notificationsToSend = await this.prisma.notification.findMany({
            where: {},
            include: {
                user: {
                    include: {
                        userSettings: true,
                    },
                },
            },
        });

        for (const notification of notificationsToSend) {
            if (notification.user.userSettings.notifications) {
                await this.notificationService.sendNotification({
                    subject: 'Summary is ready',
                    template: './summary_ready',
                    context: {
                        username: notification.user.username,
                        summaryId: notification.summaryId,
                    },
                    to: notification.user.email,
                });
            }

            await this.prisma.notification.delete({
                where: {
                    id: notification.id,
                },
            });
        }
    }
}

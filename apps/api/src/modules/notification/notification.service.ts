import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Attachment } from 'nodemailer/lib/mailer';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(private readonly mailerService: MailerService) {}

    async sendNotification({
        subject,
        text,
        template,
        to,
        context,
        attachments,
    }: {
        subject: string;
        template?: string;
        text?: string;
        to: string;
        context?: {
            [name: string]: any;
        };
        attachments?: Attachment[];
    }) {
        this.logger.log(`Sending notification about ${subject} to ${to}`);

        await this.mailerService
            .sendMail({
                to,
                from: 'snipscribe@gmail.com',
                subject,
                template: template ? template : './generic',
                context: text || !context ? { body: text } : context,
                attachments,
            })
            .catch(error => {
                this.logger.error(`Error occurred while sending notification: ${error}`);
            });
    }
}

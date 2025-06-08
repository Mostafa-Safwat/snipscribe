import { Module } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { generateMailerConfig } from './mailer.config';

@Module({
    providers: [
        {
            provide: MailerService,
            useFactory: async () => {
                const mailerOptions = await generateMailerConfig();
                // @ts-ignore
                return new MailerService(mailerOptions, null);
            },
        },
    ],
    exports: [MailerService],
})
export class MailerModule {}

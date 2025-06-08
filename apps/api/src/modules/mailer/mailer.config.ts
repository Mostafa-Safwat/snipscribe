import { Logger } from '@nestjs/common';
import { MailerOptions } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as fs from 'fs';
import nodemailer from 'nodemailer';
import { join } from 'path';

const logger = new Logger('MailerService');

export const generateMailerConfig = async () => {
    let transporter: string;

    if (!process.env.GOOGLE_APP_USERNAME || !process.env.GOOGLE_APP_PASSWORD) {
        // You can check the messages sent on their website https://ethereal.email/messages
        // Use the credentials generated in the ethereal-test-email.json to login there
        try {
            transporter = await createEtherealTransporter();
        } catch (error) {
            logger.error(error);
            transporter = `smtp://user:pass@smtp.dummy`;
        }
    } else {
        transporter = `smtps://${process.env.GOOGLE_APP_USERNAME}:${process.env.GOOGLE_APP_PASSWORD}@smtp.gmail.com`;
    }

    return {
        transport: transporter,
        defaults: {
            from: '"Snipscribe" <snipscribe@gmail.com>',
        },
        template: {
            dir: join(process.cwd(), 'templates'),
            adapter: new EjsAdapter(),
        },
    } as MailerOptions;
};

const createEtherealTransporter = async () => {
    logger.warn('WARNING: No Google app username or password was provided in the .env for sending emails');

    let { username: etherealUsername, password: etherealPassword } = readEtherealCredentialsFromFile();

    if (!etherealUsername || !etherealPassword) {
        const etherealCredentials = await createEtherealCredentials();

        etherealUsername = etherealCredentials.username;
        etherealPassword = etherealCredentials.password;
    }

    logger.log(`Test email: ${etherealUsername}`);
    logger.log(`Test password: ${etherealPassword}`);

    return `smtp://${etherealUsername}:${etherealPassword}@smtp.ethereal.email`;
};

const createEtherealCredentials = async () => {
    logger.warn('Creating Ethereal test account...');

    const testAccount = await nodemailer.createTestAccount();

    const etherealFileContent = {
        username: testAccount.user,
        password: testAccount.pass,
        creation_date: new Date().toISOString(),
    };

    fs.writeFileSync('./ethereal-test-email.json', JSON.stringify(etherealFileContent));

    return { username: testAccount.user, password: testAccount.pass };
};

const readEtherealCredentialsFromFile = () => {
    try {
        const etherealFile = fs.readFileSync('./ethereal-test-email.json', 'utf-8');
        const parsedEtherealFile: { username: string; password: string; creation_date: string } =
            JSON.parse(etherealFile);

        const today = new Date().getTime();
        const creationDate = new Date(parsedEtherealFile.creation_date).getTime();

        if (today < creationDate + 24 * 60 * 60 * 1000) {
            return { username: parsedEtherealFile.username, password: parsedEtherealFile.password };
        }
    } catch {
        logger.error('Error parsing ethereal-test-email.json');
    }

    return { username: null, password: null };
};

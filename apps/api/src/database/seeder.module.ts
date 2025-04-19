import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@/prisma.module';

import { Seeder } from './seeder';
import { UserSeederModule } from './seeder/user/user.seeder.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            expandVariables: true,
            isGlobal: true,
            cache: true,
        }),
        PrismaModule,
        UserSeederModule,
    ],
    providers: [Logger, Seeder],
})
export class SeederModule {}

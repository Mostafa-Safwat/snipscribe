import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma.module';

import { UserSeederService } from './user.seeder.service';

@Module({
    imports: [PrismaModule],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}

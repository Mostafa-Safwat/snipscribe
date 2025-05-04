import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma.module';

import { UserModule } from '../user/user.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
    imports: [PrismaModule, UserModule],
    providers: [SummaryService],
    controllers: [SummaryController],
    exports: [SummaryService],
})
export class SummaryModule {}

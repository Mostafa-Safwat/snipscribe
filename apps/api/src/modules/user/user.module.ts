import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma.module';

import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}

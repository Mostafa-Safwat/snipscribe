import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@snipscribe/database';

import { ROLES_KEY } from '@/decorators/allowed-roles.decorator';
import { UserDto } from '@/modules/user/types/user.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        @Inject(PrismaService) private prisma: PrismaService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const user: UserDto = request.user;

        if (user.role === Role.ADMIN) return true;

        const allowedRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!allowedRoles.includes(user.role as Role)) return false;

        return false;
    }
}

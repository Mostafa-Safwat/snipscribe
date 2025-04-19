import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Role } from '@snipscribe/database';

import { PrismaService } from '@/prisma.service';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './types/user.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly prisma: PrismaService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {}

    async getUsers() {
        const users = await this.prisma.user.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {},
        });
        const size = await this.prisma.user.count({
            where: {},
        });

        return { users, size };
    }

    async getById({ id }: { id: number }) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async getByUsername({ username }: { username: string }) {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async getByRefreshToken({ refreshToken }: { refreshToken: string }) {
        const refreshTokenData = await this.authService.getRefreshToken({ refreshToken });

        return refreshTokenData.user;
    }

    async save({ data }: { data: CreateUserDto }) {
        const createdUser = await this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                role: data.role as Role,
                password: data.password,
            },
        });

        return createdUser;
    }

    async update({ id, data }: { id: number; data: UpdateUserDto }) {
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
                role: data.role as Role,
            },
        });

        return updatedUser;
    }

    async updateByUsername({ username, data }: { username: string; data: UpdateUserDto }) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    username,
                },
                data: {
                    ...data,
                    role: data.role as Role,
                },
            });

            return updatedUser;
        } catch {
            return null;
        }
    }

    async delete({ id }: { id: number }) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id,
            },
        });

        return deletedUser;
    }
}

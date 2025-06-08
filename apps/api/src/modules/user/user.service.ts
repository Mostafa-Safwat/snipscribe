import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@snipscribe/database';

import { PrismaService } from '@/prisma.service';
import { encryptPassword } from '@/utils/password';

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
            include: {
                userSettings: true,
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

    async getByEmail({ email }: { email: string }) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                userSettings: true,
            },
        });
    }

    async getByRefreshToken({ refreshToken }: { refreshToken: string }) {
        const refreshTokenData = await this.authService.getRefreshToken({ refreshToken });

        return refreshTokenData.user;
    }

    async getUserSettings({ id }: { id: number }) {
        return this.prisma.userSettings.findUnique({
            where: {
                userId: id,
            },
        });
    }

    async save({ data }: { data: CreateUserDto }) {
        const existingUser = await this.getByUsername({ username: data.username });
        if (existingUser) {
            throw new BadRequestException(`User with username ${data.username} already exists`);
        }

        const existingEmail = await this.getByUsername({ username: data.email });
        if (existingEmail) {
            throw new BadRequestException(`User with email ${data.email} already exists`);
        }

        data.password = await encryptPassword(data.password);
        const createdUser = await this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.password,
                userSettings: {
                    create: {},
                },
            },
        });

        delete createdUser.password;

        return createdUser;
    }

    async update({ id, data }: { id: number; data: UpdateUserDto }) {
        const userData: Prisma.UserUpdateInput = {};
        const userSettingsData: Prisma.UserSettingsUpdateInput = {};

        if (data.username) {
            const existingUser = await this.getByUsername({ username: data.username });
            if (existingUser && existingUser.id !== id) {
                throw new BadRequestException(`User with username ${data.username} already exists`);
            }

            userData.username = data.username;
        }

        if (data.email) {
            const existingEmail = await this.getByUsername({ username: data.email });
            if (existingEmail && existingEmail.id !== id) {
                throw new BadRequestException(`User with email ${data.email} already exists`);
            }

            userData.email = data.email;
        }

        if (data.password) {
            data.password = await encryptPassword(data.password);

            userData.password = data.password;
        }

        if (data.sharing !== undefined) {
            userSettingsData.sharing = data.sharing;
        }

        if (data.notifications !== undefined) {
            userSettingsData.notifications = data.notifications;
        }

        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...userData,
                userSettings: {
                    update: userSettingsData,
                },
            },
        });

        delete updatedUser.password;

        return updatedUser;
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

import { forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

import { PrismaService } from '@/prisma.service';
import { comparePassword } from '@/utils/password';

import { UserDto } from '../user/types/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './types/auth.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {}

    async validateUser({ email, password }: LoginDto) {
        const user = await this.userService.getByEmail({ email });
        if (!user) return null;

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }

    async login({ email, password }: LoginDto) {
        const user = await this.validateUser({ email, password });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const refreshToken = this.getRefreshJWT({ user });
        await this.setRefreshToken({ refreshToken: refreshToken.token, userId: user.id });
        const accessToken = this.getJWT({ user });
        return {
            user,
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
        };
    }

    async getRefreshToken({ refreshToken }: { refreshToken: string }) {
        const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const refreshTokenData = await this.prisma.refreshToken.findUnique({
            where: {
                currentHashedRefreshToken: hashedToken,
            },
            include: {
                user: true,
            },
        });

        if (!refreshTokenData) throw new UnauthorizedException();

        return refreshTokenData;
    }

    async setRefreshToken({ refreshToken, userId }: { refreshToken: string; userId: number }) {
        const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await this.prisma.refreshToken.create({
            data: {
                currentHashedRefreshToken: hashedToken,
                userId,
            },
        });
    }

    public getJWT({ user }: { user: UserDto }) {
        const payload = {
            userId: user.id,
        };

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        });

        return {
            token,
        };
    }

    public getRefreshJWT({ user }: { user: UserDto }) {
        const payload = {
            userId: user.id,
        };

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
        });

        return {
            token,
        };
    }
}

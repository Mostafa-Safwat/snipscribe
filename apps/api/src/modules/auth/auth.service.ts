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

        const accessTokenCookie = this.getCookieWithJWT({ userId: user.id });
        const refreshTokenCookie = this.getCookieWithRefreshJWT({ userId: user.id });
        await this.setRefreshToken({ refreshToken: refreshTokenCookie.token, userId: user.id });

        return {
            user,
            accessToken: accessTokenCookie,
            refreshToken: refreshTokenCookie,
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

    public getCookieWithJWT({ userId }: { userId: number }) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${60}s`,
        });
        const cookie = `Authentication=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=${this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
        )}`;
        return {
            cookie,
            token,
        };
    }

    public getCookieWithRefreshJWT({ userId }: { userId: number }) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
        });
        const cookie = `Refresh=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=${this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
        )}`;
        return {
            cookie,
            token,
        };
    }

    public getCookiesForLogOut() {
        return ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UserDto } from '../user/types/user.dto';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './strategies/jwt-refresh.strategy';
import { LoginDto, RequestWithUser } from './types/auth.dto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Req() req: Request,
        @Body(new ValidationPipe({ whitelist: true })) postData: LoginDto
    ): Promise<UserDto> {
        const { user, accessToken, refreshToken } = await this.authService.login(postData);

        this.setLoginCookies(req, { accessTokenCookie: accessToken.cookie, refreshTokenCookie: refreshToken.cookie });
        delete user.password;

        return user;
    }

    @Get('refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshAuthGuard)
    async refreshAccessToken(@Req() req: RequestWithUser) {
        const { cookie } = this.authService.getCookieWithJWT({ userId: req.user.id });

        this.setLoginCookies(req, { accessTokenCookie: cookie, refreshTokenCookie: req.cookies.Refresh });

        return true;
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: RequestWithUser) {
        req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
        return true;
    }

    private setLoginCookies(req: Request, user: { accessTokenCookie: string; refreshTokenCookie: string }) {
        const { accessTokenCookie, refreshTokenCookie } = user;
        req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    }
}

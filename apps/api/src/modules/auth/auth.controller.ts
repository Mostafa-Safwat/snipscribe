import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './strategies/jwt-refresh.strategy';
import { LoginDto, LoginResponseDto, RefreshTokenDto, RequestWithUser } from './types/auth.dto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body(new ValidationPipe({ whitelist: true })) postData: LoginDto): Promise<LoginResponseDto> {
        const { user, accessToken, refreshToken } = await this.authService.login(postData);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    @Get('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshAccessToken(@Req() req: RequestWithUser): Promise<RefreshTokenDto> {
        const { token } = this.authService.getJWT({ user: req.user });

        return {
            accessToken: token,
        };
    }
}

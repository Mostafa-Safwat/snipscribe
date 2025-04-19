import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './strategies/jwt-refresh.strategy';
import { RefreshTokenDto, RequestWithUser } from './types/auth.dto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshAccessToken(@Req() req: RequestWithUser): Promise<RefreshTokenDto> {
        const { token } = this.authService.getJWT({ user: req.user });

        return {
            accessToken: token,
        };
    }
}

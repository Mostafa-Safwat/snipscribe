import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@/modules/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.headers.authorization?.replace('Bearer ', '');
                },
            ]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: { userId: number }) {
        if (!payload.userId) return;

        return await this.userService.getById({
            id: payload.userId,
        });
    }
}

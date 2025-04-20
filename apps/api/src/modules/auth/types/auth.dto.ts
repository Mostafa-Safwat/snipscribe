import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserDto } from '@/modules/user/types/user.dto';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RefreshTokenData {
    userId: number;
    exp?: number;
    iat?: number;
}

export class RequestTokenDto {
    email: string;
}

export class VerifyTokenDto {
    email: string;
    token: number;
}

export class LoginResponseDto {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}

export class RequestWithUser extends Request {
    user: UserDto;
    refreshToken?: string;
}

export class RefreshTokenDto {
    accessToken: string;
}

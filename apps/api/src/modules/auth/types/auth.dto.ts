import { UserDto } from '@/modules/user/types/user.dto';

export class AccessTokenData {
    userId: number;
    buildingName: string;
    floorNumber: number;
    apartmentNumber: number;
    role: string;
}

export class RefreshTokenData {
    userId: number;
    exp?: number;
    iat?: number;
}

export class RequestTokenDto {
    username: string;
}

export class VerifyTokenDto {
    username: string;
    token: number;
}

export class TokenDto {
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

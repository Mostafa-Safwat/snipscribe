import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export class UserSettingsDto {
    id: number;
    userId: number;
    sharing: boolean;
    notifications: boolean;
}

export class UserDto {
    id: number;
    email: string;
    username: string;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    role: UserRole;

    @ApiProperty()
    settings?: UserSettingsDto;
}

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsBoolean()
    @IsOptional()
    sharing?: boolean;

    @IsBoolean()
    @IsOptional()
    notifications?: boolean;
}

export class GetUsersResponse {
    users: UserDto[];
    size: number;
}

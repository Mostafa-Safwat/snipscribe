import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export class UserDto {
    id: number;
    email: string;
    username: string;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    role: UserRole;
}

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    chatId?: number;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}

export class GetUsersResponse {
    users: UserDto[];
    size: number;
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@snipscribe/database';

import { AuthorizationGuard } from '@/common/guards/authorization.guard';
import { AllowedRoles } from '@/decorators/allowed-roles.decorator';

import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { CreateUserDto, GetUsersResponse, UpdateUserDto, UserDto } from './types/user.dto';
import { UserService } from './user.service';

@Controller({ path: 'users', version: '1' })
@UseGuards(AuthorizationGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @AllowedRoles(Role.ADMIN)
    async getUsers(): Promise<GetUsersResponse> {
        return this.userService.getUsers();
    }

    @Get(':id')
    @AllowedRoles(Role.ADMIN)
    getUser(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
        return this.userService.getById({ id });
    }

    @Post()
    @AllowedRoles(Role.ADMIN)
    async createUser(@Body(new ValidationPipe({ whitelist: true })) postData: CreateUserDto): Promise<UserDto> {
        return this.userService.save({ data: postData });
    }

    @Patch(':id')
    @AllowedRoles(Role.ADMIN)
    updateUser(
        @Param('id', new ParseIntPipe()) id: number,
        @Body(new ValidationPipe({ whitelist: true })) postData: UpdateUserDto
    ): Promise<UserDto> {
        return this.userService.update({ id, data: postData });
    }

    @Delete(':id')
    @AllowedRoles(Role.ADMIN)
    deleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
        return this.userService.delete({ id });
    }
}

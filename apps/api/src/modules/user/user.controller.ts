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
import { AllowSelf } from '@/decorators/allow-self.decorator';
import { AllowedRoles } from '@/decorators/allowed-roles.decorator';

import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { CreateUserDto, GetUsersResponse, UpdateUserDto, UserDto } from './types/user.dto';
import { UserService } from './user.service';

@Controller({ path: 'users', version: '1' })
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    @AllowedRoles(Role.ADMIN)
    async getUsers(): Promise<GetUsersResponse> {
        return this.userService.getUsers();
    }

    @Get(':userId')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    @AllowedRoles(Role.ADMIN)
    @AllowSelf()
    getUser(@Param('userId', new ParseIntPipe()) userId: number): Promise<UserDto> {
        return this.userService.getById({ id: userId });
    }

    @Post()
    async createUser(@Body(new ValidationPipe({ whitelist: true })) postData: CreateUserDto): Promise<UserDto> {
        return this.userService.save({ data: postData });
    }

    @Patch(':userId')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    @AllowedRoles(Role.ADMIN)
    @AllowSelf()
    updateUser(
        @Param('userId', new ParseIntPipe()) userId: number,
        @Body(new ValidationPipe({ whitelist: true })) postData: UpdateUserDto
    ): Promise<UserDto> {
        return this.userService.update({ id: userId, data: postData });
    }

    @Delete(':userId')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    @AllowedRoles(Role.ADMIN)
    @AllowSelf()
    deleteUser(@Param('userId', new ParseIntPipe()) userId: number): Promise<UserDto> {
        return this.userService.delete({ id: userId });
    }
}

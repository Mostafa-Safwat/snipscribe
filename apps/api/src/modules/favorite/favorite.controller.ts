import { Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthorizationGuard } from '@/common/guards/authorization.guard';

import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { RequestWithUser } from '../auth/types/auth.dto';
import { GetSummariesQuery, GetSummariesResponse } from '../summary/types/summary.dto';
import { FavoriteService } from './favorite.service';

@Controller({ path: 'favorites', version: '1' })
@UseGuards(AuthorizationGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('Favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @Get()
    async getFavorites(
        @Req() { user }: RequestWithUser,
        @Query() { skip, take, search }: GetSummariesQuery
    ): Promise<GetSummariesResponse> {
        return this.favoriteService.getUserFavorites({ userId: user.id, params: { skip, take, search } });
    }

    @Post(':summaryId')
    async addSummaryToFavorites(
        @Req() { user }: RequestWithUser,
        @Param('summaryId', new ParseIntPipe()) summaryId: number
    ): Promise<boolean> {
        await this.favoriteService.addToFavorites({ id: summaryId, userId: user.id });

        return true;
    }

    @Delete(':summaryId')
    async removeSummaryFromFavorites(
        @Req() { user }: RequestWithUser,
        @Param('summaryId', new ParseIntPipe()) summaryId: number
    ): Promise<boolean> {
        await this.favoriteService.removeFromFavorites({ id: summaryId, userId: user.id });

        return true;
    }
}

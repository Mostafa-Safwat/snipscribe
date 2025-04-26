import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthorizationGuard } from '@/common/guards/authorization.guard';

import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { RequestWithUser } from '../auth/types/auth.dto';
import { SummaryService } from './summary.service';
import {
    CreateSummaryRequestDto,
    GetSummariesResponse,
    SummaryRequestDto,
    UpdateSummaryRequestDto,
} from './types/summary.dto';

@Controller({ path: 'summaries', version: '1' })
@ApiTags('Summaries')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) {}

    @Get()
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    async getUserSummaries(@Req() { user }: RequestWithUser): Promise<GetSummariesResponse> {
        return this.summaryService.getUserSummaries({ userId: user.id });
    }

    @Get('public')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    async getPublicSummaries(): Promise<GetSummariesResponse> {
        return this.summaryService.getPublicSummaries();
    }

    @Get(':summaryId')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    async getSummary(
        @Param('summaryId', new ParseIntPipe()) summaryId: number,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryRequestDto> {
        const summaryRequest = await this.summaryService.getById({ id: summaryId, userId: user.id });

        if (!summaryRequest) {
            throw new NotFoundException('Summary not found');
        }

        if (summaryRequest.userId !== user.id && !summaryRequest.isShared) {
            throw new NotFoundException('Summary not found');
        }

        return summaryRequest;
    }

    @Post()
    async createSummary(
        @Body(new ValidationPipe({ whitelist: true })) postData: CreateSummaryRequestDto,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryRequestDto> {
        return this.summaryService.save({ data: postData, userId: user.id });
    }

    @Patch(':summaryId')
    @UseGuards(AuthorizationGuard)
    @UseGuards(JwtAuthGuard)
    updateSummary(
        @Param('summaryId', new ParseIntPipe()) summaryId: number,
        @Body(new ValidationPipe({ whitelist: true })) postData: UpdateSummaryRequestDto,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryRequestDto> {
        return this.summaryService.update({ id: summaryId, data: postData, userId: user.id });
    }
}

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
    SummaryDto,
    SummaryRequestDto,
    UpdateSummaryDto,
} from './types/summary.dto';

@Controller({ path: 'summaries', version: '1' })
@UseGuards(AuthorizationGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('Summaries')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) {}

    @Get()
    async getUserSummaries(@Req() { user }: RequestWithUser): Promise<GetSummariesResponse> {
        return this.summaryService.getUserSummaries({ userId: user.id });
    }

    @Get('public')
    async getPublicSummaries(): Promise<GetSummariesResponse> {
        return this.summaryService.getPublicSummaries();
    }

    @Get(':summaryId')
    async getSummary(
        @Param('summaryId', new ParseIntPipe()) summaryId: number,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryDto> {
        const summary = await this.summaryService.getById({ id: summaryId, userId: user.id });

        if (!summary) {
            throw new NotFoundException('Summary not found');
        }

        if (summary.summaryRequest.userId !== user.id && !summary.isShared) {
            throw new NotFoundException('Summary not found');
        }

        return summary;
    }

    @Post()
    async createSummary(
        @Body(new ValidationPipe({ whitelist: true })) postData: CreateSummaryRequestDto,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryRequestDto> {
        return this.summaryService.save({ data: postData, userId: user.id });
    }

    @Patch(':summaryId')
    updateSummary(
        @Param('summaryId', new ParseIntPipe()) summaryId: number,
        @Body(new ValidationPipe({ whitelist: true })) postData: UpdateSummaryDto,
        @Req() { user }: RequestWithUser
    ): Promise<SummaryDto> {
        return this.summaryService.update({ id: summaryId, data: postData, userId: user.id });
    }
}

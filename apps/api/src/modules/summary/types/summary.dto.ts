import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { FavoriteDto } from '@/modules/favorite/types/favorite.dto';

export const Status = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    ARCHIVED: 'ARCHIVED',
};

export type Status = (typeof Status)[keyof typeof Status];

export const VideoType = {
    YOUTUBE: 'YOUTUBE',
    FILE: 'FILE',
};

export type VideoType = (typeof VideoType)[keyof typeof VideoType];

export class SummaryRequestDto {
    id: number;
    userId: number;
    language: string;

    summaries?: SummaryDto[];
}

export class SummaryDto {
    id: number;
    summaryRequestId: number;
    videoId: number;
    title: string;
    body: string;
    status: Status;
    createdAt: Date;
    isShared: boolean;

    favorites?: FavoriteDto[];
    summaryRequest?: SummaryRequestDto;
    video?: VideoDto;
}

export class VideoDto {
    id: number;
    type: VideoType;
    url: string;
    createdAt: Date;

    summary?: SummaryDto;
}

export class CreateSummaryRequestDto {
    @IsUrl()
    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    language: string;
}

export class UpdateSummaryDto {
    @IsBoolean()
    @IsNotEmpty()
    isShared: boolean;
}

export class GetSummariesResponse {
    summaries: SummaryDto[];
    size: number;
}

export class GetSummariesQuery {
    @ApiProperty({ required: false })
    @Type(() => Number)
    skip?: number;

    @ApiProperty({ required: false })
    @Type(() => Number)
    take?: number;

    @ApiProperty({ required: false })
    search?: string;
}

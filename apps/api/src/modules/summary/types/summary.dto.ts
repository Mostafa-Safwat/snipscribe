import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export const Status = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    ARCHIVED: 'ARCHIVED',
};

export type Status = (typeof Status)[keyof typeof Status];

export const Type = {
    YOUTUBE: 'YOUTUBE',
    FILE: 'FILE',
};

export type Type = (typeof Type)[keyof typeof Type];

export class SummaryRequestDto {
    id: number;
    userId: number;
    isShared: boolean;

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

    summaryRequest?: SummaryRequestDto;
    video?: VideoDto;
}

export class VideoDto {
    id: number;
    type: Type;
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

export class UpdateSummaryRequestDto {
    @IsBoolean()
    @IsNotEmpty()
    isShared: boolean;
}

export class GetSummariesResponse {
    summaryRequests: SummaryRequestDto[];
    size: number;
}

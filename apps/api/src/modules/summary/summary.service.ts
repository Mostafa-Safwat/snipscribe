import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { extractLinksFromPlaylist, isPlaylist } from '@/utils/youtube';

import { UserService } from '../user/user.service';
import { CreateSummaryRequestDto, UpdateSummaryDto } from './types/summary.dto';

@Injectable()
export class SummaryService {
    private readonly logger = new Logger(SummaryService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) {}

    async getUserSummaries({
        userId,
        params,
    }: {
        userId: number;
        params: { skip?: number; take?: number; search?: string };
    }) {
        const user = await this.userService.getById({ id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const summaries = await this.prisma.summary.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                summaryRequest: {
                    userId,
                },
                status: 'COMPLETED',
                ...(params.search && {
                    OR: [
                        {
                            title: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            body: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },
            skip: params.skip,
            take: params.take,
            include: {
                video: true,
                summaryRequest: true,
                favorites: {
                    where: {
                        userId,
                    },
                },
            },
        });
        const size = await this.prisma.summary.count({
            where: {
                summaryRequest: {
                    userId,
                },
                status: 'COMPLETED',
                ...(params.search && {
                    OR: [
                        {
                            title: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            body: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },
        });

        return { summaries, size };
    }

    async getPublicSummaries({
        userId,
        params,
    }: {
        userId: number;
        params: { skip?: number; take?: number; search?: string };
    }) {
        const summaries = await this.prisma.summary.findMany({
            orderBy: [
                {
                    noOfFavorites: 'desc',
                },
                {
                    createdAt: 'desc',
                },
            ],
            where: {
                isShared: true,
                status: 'COMPLETED',
                ...(params.search && {
                    OR: [
                        {
                            title: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            body: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },
            skip: params.skip,
            take: params.take,
            include: {
                notes: true,
                video: true,
                favorites: {
                    where: {
                        userId,
                    },
                },
            },
        });
        const size = await this.prisma.summary.count({
            where: {
                isShared: true,
                status: 'COMPLETED',
                ...(params.search && {
                    OR: [
                        {
                            title: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            body: {
                                contains: params.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },
        });

        return { summaries, size };
    }

    async getById({ id, userId }: { id: number; userId: number }) {
        const summary = await this.prisma.summary.findUnique({
            where: {
                id,
            },
            include: {
                video: true,
                summaryRequest: true,
                favorites: {
                    where: {
                        userId,
                    },
                },
            },
        });

        return summary;
    }

    async save({ data, userId }: { data: CreateSummaryRequestDto; userId: number }) {
        const user = await this.userService.getById({ id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        let videoLinks: string[] = [data.url];
        if (isPlaylist(data.url)) {
            videoLinks = await extractLinksFromPlaylist(data.url);
        }

        const videos = await this.prisma.video.createManyAndReturn({
            data: videoLinks.map(link => ({
                url: link,
                type: 'YOUTUBE',
            })),
        });

        const summaryRequest = await this.prisma.summaryRequest.create({
            data: {
                userId,
                language: data.language,
                summaries: {
                    createMany: {
                        data: videos.map(video => ({
                            videoId: video.id,
                            status: 'PENDING',
                            isShared: !!user.userSettings?.sharing,
                        })),
                    },
                },
            },
        });

        return summaryRequest;
    }

    async update({ id, data, userId }: { id: number; data: UpdateSummaryDto; userId: number }) {
        const summaryRequest = await this.getById({ id, userId });

        if (!summaryRequest) {
            throw new NotFoundException('Summary not found');
        }

        if (summaryRequest.status !== 'COMPLETED') {
            throw new BadRequestException('Cannot update summary that is not completed');
        }

        const updatedSummaryRequest = await this.prisma.summary.update({
            where: {
                id,
            },
            data: {
                isShared: data.isShared,
            },
        });

        return updatedSummaryRequest;
    }
}

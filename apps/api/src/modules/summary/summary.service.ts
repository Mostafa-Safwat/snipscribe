import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { extractLinksFromPlaylist, isPlaylist } from '@/utils/youtube';

import { UserService } from '../user/user.service';
import { CreateSummaryRequestDto, UpdateSummaryRequestDto } from './types/summary.dto';

@Injectable()
export class SummaryService {
    private readonly logger = new Logger(SummaryService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) {}

    async getUserSummaries({ userId }: { userId: number }) {
        const user = await this.userService.getById({ id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const summaryRequests = await this.prisma.summaryRequest.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                userId,
            },
            include: {
                summaries: {
                    where: {
                        status: 'COMPLETED',
                    },
                    include: {
                        video: true,
                    },
                },
            },
        });
        const size = await this.prisma.summaryRequest.count({
            where: {
                userId,
            },
        });

        return { summaryRequests, size };
    }

    async getPublicSummaries() {
        const summaryRequests = await this.prisma.summaryRequest.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                isShared: true,
            },
            include: {
                summaries: {
                    where: {
                        status: 'COMPLETED',
                    },
                    include: {
                        notes: true,
                        video: true,
                    },
                },
            },
        });
        const size = await this.prisma.summaryRequest.count({
            where: {
                isShared: true,
            },
        });

        return { summaryRequests, size };
    }

    async getById({ id, userId }: { id: number; userId: number }) {
        const user = await this.userService.getById({ id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const summary = await this.prisma.summaryRequest.findUnique({
            where: {
                id,
            },
            include: {
                summaries: {
                    include: {
                        notes: true,
                        video: true,
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
                            isShared: user.userSettings?.sharing || false,
                        })),
                    },
                },
            },
        });

        return summaryRequest;
    }

    async update({ id, data, userId }: { id: number; data: UpdateSummaryRequestDto; userId: number }) {
        const summaryRequest = await this.getById({ id, userId });

        if (!summaryRequest) {
            throw new NotFoundException('Summary request not found');
        }

        if (!summaryRequest.summaries.length) {
            throw new BadRequestException('Cannot update summary request with no completed summaries');
        }

        const updatedSummaryRequest = await this.prisma.summaryRequest.update({
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

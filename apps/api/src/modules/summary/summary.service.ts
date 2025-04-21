import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { extractLinksFromPlaylist, isPlaylist } from '@/utils/youtube';

import { UserService } from '../user/user.service';
import { CreateSummaryRequestDto } from './types/summary.dto';

@Injectable()
export class SummaryService {
    private readonly logger = new Logger(SummaryService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) {}

    async getUsers() {
        const users = await this.prisma.user.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {},
        });
        const size = await this.prisma.user.count({
            where: {},
        });

        return { users, size };
    }

    async getById({ id }: { id: number }) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
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
                        })),
                    },
                },
            },
        });

        return summaryRequest;
    }
}

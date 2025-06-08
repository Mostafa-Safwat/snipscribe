import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Status } from '@snipscribe/database';

import { PrismaService } from '@/prisma.service';

@Injectable()
export class FavoriteService {
    private readonly logger = new Logger(FavoriteService.name);

    constructor(private readonly prisma: PrismaService) {}

    async getUserFavorites({
        userId,
        params,
    }: {
        userId: number;
        params: { skip?: number; take?: number; search?: string };
    }) {
        const favorites = await this.prisma.favorite.findMany({
            orderBy: {
                summaryId: 'desc',
            },
            where: {
                userId,
                summary: {
                    status: Status.COMPLETED,
                    OR: [{ summaryRequest: { userId } }, { isShared: true }],
                },
            },
            skip: params.skip,
            take: params.take,
            include: {
                summary: {
                    include: {
                        video: true,
                        summaryRequest: true,
                    },
                },
            },
        });

        const size = await this.prisma.favorite.count({
            where: {
                userId,
                summary: {
                    status: Status.COMPLETED,
                    isShared: true,
                },
            },
        });

        const summaries = favorites.map(favorite => favorite.summary);

        return { summaries, size };
    }

    async addToFavorites({ id, userId }: { id: number; userId: number }) {
        const summary = await this.prisma.summary.findUnique({
            where: {
                id,
            },
            include: {
                summaryRequest: true,
            },
        });

        if (
            !summary ||
            summary.status !== Status.COMPLETED ||
            (summary.summaryRequest.userId !== userId && !summary.isShared)
        ) {
            throw new NotFoundException('Summary not found');
        }

        const existingFavorite = await this.prisma.favorite.findUnique({
            where: {
                userId_summaryId: {
                    summaryId: summary.id,
                    userId,
                },
            },
        });

        if (existingFavorite) {
            throw new BadRequestException('Summary is already in favorites');
        }

        const favorite = await this.prisma.favorite.create({
            data: {
                summary: {
                    connect: {
                        id: summary.id,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        await this.prisma.summary.update({
            where: {
                id: summary.id,
            },
            data: {
                noOfFavorites: {
                    increment: 1,
                },
            },
        });

        return favorite;
    }

    async removeFromFavorites({ id, userId }: { id: number; userId: number }) {
        const summary = await this.prisma.summary.findUnique({
            where: {
                id,
            },
            include: {
                summaryRequest: true,
            },
        });

        if (
            !summary ||
            summary.status !== Status.COMPLETED ||
            (summary.summaryRequest.userId !== userId && !summary.isShared)
        ) {
            throw new NotFoundException('Summary not found');
        }

        const existingFavorite = await this.prisma.favorite.findUnique({
            where: {
                userId_summaryId: {
                    summaryId: summary.id,
                    userId,
                },
            },
        });

        if (!existingFavorite) {
            throw new BadRequestException('Summary is not in favorites');
        }

        const favorite = await this.prisma.favorite.delete({
            where: {
                userId_summaryId: {
                    summaryId: summary.id,
                    userId,
                },
            },
        });

        await this.prisma.summary.update({
            where: {
                id: summary.id,
            },
            data: {
                noOfFavorites: {
                    decrement: 1,
                },
            },
        });

        return favorite;
    }
}

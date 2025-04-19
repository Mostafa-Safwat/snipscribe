import { Injectable } from '@nestjs/common';
import { Role } from '@snipscribe/database';

import { ISeeder } from '@/database/seeder';
import { PrismaService } from '@/prisma.service';

import { users } from './data';

@Injectable()
export class UserSeederService implements ISeeder {
    constructor(private readonly prisma: PrismaService) {}

    async seed(): Promise<void> {
        await Promise.all(
            users.map(async user => {
                await this.prisma.user.upsert({
                    where: { username: user.username },
                    update: {},
                    create: {
                        email: user.email,
                        username: user.username,
                        role: user.role as Role,
                        password: user.password,
                    },
                });
            })
        );
    }
}

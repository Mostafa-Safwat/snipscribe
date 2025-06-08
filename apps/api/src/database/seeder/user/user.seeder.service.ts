import { Injectable } from '@nestjs/common';
import { Role } from '@snipscribe/database';

import { ISeeder } from '@/database/seeder';
import { PrismaService } from '@/prisma.service';
import { encryptPassword } from '@/utils/password';

import { users } from './data';

@Injectable()
export class UserSeederService implements ISeeder {
    constructor(private readonly prisma: PrismaService) {}

    async seed(): Promise<void> {
        console.log('Seeding users...');
        await Promise.all(
            users.map(async user => {
                user.password = await encryptPassword(user.password);
                const userData = await this.prisma.user.upsert({
                    where: { username: user.username },
                    update: {},
                    create: {
                        email: user.email,
                        username: user.username,
                        role: user.role as Role,
                        password: user.password,
                        userSettings: {},
                    },
                });

                console.log(`User seeded`, userData);
            })
        );
    }
}

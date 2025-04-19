import { Injectable, Logger } from '@nestjs/common';

import { UserSeederService } from './seeder/user/user.seeder.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly userSeederService: UserSeederService
    ) {}

    async seed() {
        this.logger.debug('Seeding started...');
        await this.userSeederService.seed();
    }
}

export abstract class ISeeder {
    abstract seed(): Promise<void>;
}

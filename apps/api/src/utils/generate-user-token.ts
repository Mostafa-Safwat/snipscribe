import { randomInt } from 'crypto';

export function generateUserToken() {
    return randomInt(100000, 1000000);
}

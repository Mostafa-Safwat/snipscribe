import { SetMetadata } from '@nestjs/common';

export const ALLOW_SELF_KEY = 'allow_self';
export const AllowSelf = () => SetMetadata(ALLOW_SELF_KEY, 1);

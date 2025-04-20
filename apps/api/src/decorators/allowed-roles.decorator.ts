import { SetMetadata } from '@nestjs/common';
import { Role } from '@snipscribe/database';

export const ROLES_KEY = 'roles';
export const AllowedRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

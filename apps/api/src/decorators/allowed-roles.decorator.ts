import { Role } from '@snipscribe/database';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AllowedRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

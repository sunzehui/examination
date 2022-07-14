import { SetMetadata } from '@nestjs/common';

export enum Role {
  student = 0,
  teacher = 1,
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

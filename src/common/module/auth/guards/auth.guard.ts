import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles, Role } from '@/common/module/auth/decorator/role.decorator';
import { RolesGuard } from '@/common/module/auth/guards/role.guard';
import { JwtAuthGuard } from '@/common/module/auth/guards/jwt-auth.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
}

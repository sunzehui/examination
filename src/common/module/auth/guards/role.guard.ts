import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '@/common/module/auth/decorator/role.decorator';
import * as isEmpty from 'lodash/isEmpty';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isEmpty(requiredRoles)) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

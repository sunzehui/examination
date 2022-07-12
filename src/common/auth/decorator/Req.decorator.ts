import { UserStatusDTO } from '@/common/user/dto/user-status.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator<
  string,
  ExecutionContext,
  UserStatusDTO
>((data: string, ctx: ExecutionContext): UserStatusDTO => {
  const req = ctx.switchToHttp().getRequest();
  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }
});

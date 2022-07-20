import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomSocket } from '@/common/types/CustomSocket';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const socket = ctx.switchToWs().getClient() as CustomSocket;
  // if route is protected, there is a user set in auth.middleware
  if (!!socket.user) {
    return !!data ? socket.user[data] : socket.user;
  }
});

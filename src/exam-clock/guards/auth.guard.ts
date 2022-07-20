import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as _get from 'lodash/get';
import { AuthService } from '@/common/module/auth/auth.service';
import { UserService } from '@/common/module/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient();
    const token = _get(socket, 'handshake.headers.authorization');
    try {
      const decodedToken = await this.authService.verifyJwt(token);
      socket.user = await this.userService.findOneById(+decodedToken.id);
    } catch (e) {
      throw new WsException(e.message);
    }

    return true;
  }
}

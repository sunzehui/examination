import { TokenExpiredError } from 'jsonwebtoken';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(TokenExpiredError, HttpException)
export class UnauthorizedErrorFilter extends BaseWsExceptionFilter {
  catch(
    exception: TokenExpiredError | UnauthorizedException,
    host: ArgumentsHost,
  ) {
    const client = host.switchToWs().getClient() as Socket;
    const error =
      exception instanceof WsException ? exception.getError() : exception;
    const details = error instanceof Object ? { ...error } : { message: error };
    client.emit('exception', details);
  }
}

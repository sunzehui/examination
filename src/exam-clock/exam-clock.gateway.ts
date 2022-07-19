import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ExamClockService } from './exam-clock.service';
import { UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ResultData } from '@/common/utils/result';

@WebSocketGateway({
  cors: true,
})
export class ExamClockGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly examClockService: ExamClockService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
      const user = await this.examClockService.getUserFromSocket(socket);
      socket.emit('connected', user);
    } catch (e) {
      return ExamClockGateway.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private static disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('findAllExamClock')
  async findAll(@ConnectedSocket() socket) {
    const user = await this.examClockService.getUserFromSocket(socket);
    const result = await this.examClockService.findAll(+user.id);
    return ResultData.ok(result);
  }

  @SubscribeMessage('findOneExamClock')
  findOne(@MessageBody() id: number) {
    return this.examClockService.findOne(id);
  }

  @SubscribeMessage('removeExamClock')
  remove(@MessageBody() id: number) {
    return this.examClockService.remove(id);
  }
}

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ExamClockService } from './exam-clock.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ResultData } from '@/common/utils/result';
import { ExamRecordDto } from '@/exam-record/dto/create-exam-record.dto';
import { CustomSocket } from '@/common/types/CustomSocket';
import { AuthGuard } from '@/exam-clock/guards/auth.guard';
import { UnauthorizedErrorFilter } from '@/common/filter/unauthorized.filter';
import { User } from '@/exam-clock/decorator/user.decorator';
import { BanRepeatGuard } from '@/exam-clock/guards/ban-repeat.guard';

@WebSocketGateway({
  cors: true,
})
@UseFilters(new UnauthorizedErrorFilter())
export class ExamClockGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly examClockService: ExamClockService) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard)
  async handleConnection(socket: CustomSocket) {
    socket.emit('connected', '考场监控连接成功！');
  }

  handleDisconnect(socket: Socket) {
    socket.emit('disconnected', '考场监控断开连接！');
    socket.disconnect();
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('findAllExamClock')
  async findAll(@User('id') userId: string) {
    const result = await this.examClockService.findAll(+userId);
    return ResultData.ok(result);
  }

  // 考生作答
  @UseGuards(AuthGuard)
  @SubscribeMessage('userAnswerRecord')
  async studentAnswer(
    @MessageBody() examRecordDto: ExamRecordDto,
    @User('id') userId,
  ) {
    const result = await this.examClockService.recordAnswer(
      examRecordDto,
      userId,
    );
    return ResultData.ok(result);
  }

  @SubscribeMessage('findOneExamClock')
  findOne(@MessageBody() id: number) {
    return this.examClockService.findOne(id);
  }

  @UseGuards(AuthGuard, BanRepeatGuard)
  @SubscribeMessage('forceSubmitPaper')
  async forceSubmitPaper(
    @MessageBody() { roomId },
    @User('id') userId: string,
  ) {
    return await this.examClockService.addForceSubmitPaperTask(
      +roomId,
      +userId,
    );
  }

  @UseGuards(AuthGuard, BanRepeatGuard)
  @SubscribeMessage('submitPaper')
  async manualSubmitPaper(
    @MessageBody() { roomId },
    @User('id') userId: string,
  ) {
    return await this.examClockService.submitPaper(+roomId, +userId);
  }

  @SubscribeMessage('removeExamClock')
  remove(@MessageBody() id: number) {
    return this.examClockService.remove(id);
  }
}

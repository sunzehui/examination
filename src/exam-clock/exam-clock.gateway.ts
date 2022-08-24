import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { ExamClockService } from './exam-clock.service';
import { Query, UseFilters, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { ResultData } from '@/common/utils/result';
import { CustomSocket } from '@/common/types/CustomSocket';
import { AuthGuard } from '@/exam-clock/guards/auth.guard';
import { UnauthorizedErrorFilter } from '@/common/filter/unauthorized.filter';
import { User } from '@/exam-clock/decorator/user.decorator';
import { BanRepeatGuard } from '@/exam-clock/guards/ban-repeat.guard';
import {
  ExamRoomRecordDto,
  RecordActionType,
} from '@/exam-clock/dto/exam-room-eecord.dto';
import { ExamRoomService } from '@/exam-room/exam-room.service';
import * as dayjs from 'dayjs';

@WebSocketGateway({
  cors: true,
})
@UseFilters(new UnauthorizedErrorFilter())
export class ExamClockGateway implements OnGatewayDisconnect {
  constructor(
    private readonly examClockService: ExamClockService,
    private readonly examRoomService: ExamRoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: CustomSocket) {
    socket.emit('disconnected', '考场监控断开连接！');
    socket.disconnect();
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('findAllExamClock')
  async findAll(@User('id') userId: string) {
    const result = await this.examClockService.findAll(+userId);
    return ResultData.ok(result);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('enterExamRoom')
  async enterExamRoom(
    @User('id') userId: string,
    @MessageBody('examRoomId') examRoomId,
  ) {
    // check time
    const examRoom = await this.examRoomService.findOne(examRoomId);
    const isBegin = dayjs(examRoom.begin_time).isBefore(dayjs());
    if (!isBegin) {
      throw new WsException('考试未开始');
    }
    // find record
    const userAnswerRecord = await this.examClockService.recordAnswer(
      examRoomId,
      +userId,
      null,
      RecordActionType.get,
    );
    return ResultData.ok(userAnswerRecord);
  }

  // 考生作答
  @UseGuards(AuthGuard)
  @SubscribeMessage('userAnswerRecord')
  async studentAnswer(
    @MessageBody() examRecordDto: ExamRoomRecordDto,
    @User('id') userId,
    @Query('action') action: RecordActionType,
    @ConnectedSocket() client: CustomSocket,
  ) {
    const result = await this.examClockService.recordAnswer(
      examRecordDto.examRoomId,
      userId,
      examRecordDto.data,
      examRecordDto.action,
    );
    this.server.to(client.id).emit('answerRecordUpdate', result);
    return ResultData.ok(null);
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
}

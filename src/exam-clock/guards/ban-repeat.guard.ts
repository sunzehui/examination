import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { CustomSocket } from '@/common/types/CustomSocket';
import { ExamRecordService } from '@/exam-record/exam-record.service';
import * as _isNumber from 'lodash/isNumber';
import * as _get from 'lodash/get';

@Injectable()
export class BanRepeatGuard implements CanActivate {
  constructor(private readonly examRecordService: ExamRecordService) {}

  getParams(ctx) {
    const socket = ctx.switchToWs().getClient() as CustomSocket;
    const data = ctx.switchToWs().getData();
    const userId = _get(socket, 'user.id');
    const roomId = _get(data, 'roomId');

    if (!(_isNumber(userId) && _isNumber(roomId)))
      throw new UnprocessableEntityException();
    return [userId, roomId];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [userId, roomId] = this.getParams(context);
    const isPaperSubmit = await this.examRecordService.findSubmitTime(
      roomId,
      userId,
    );
    if (isPaperSubmit) throw new WsException('试卷已提交');
    return true;
  }
}

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

  getWSParams(ctx: ExecutionContext) {
    const socket = ctx.switchToWs().getClient() as CustomSocket;
    const data = ctx.switchToWs().getData();
    const userId = Number(_get(socket, 'user.id'));
    const roomId = Number(_get(data, 'roomId'));
    return [userId, roomId];
  }
  getHTTPParams(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const roomId = Number(_get(request, 'query.room_id'));
    const userId = Number(_get(request, 'user.id'));

    return [userId, roomId];
  }

  getParams(ctx: ExecutionContext) {
    const ctxType = ctx.getType();
    let idUnion = [null, null];

    switch (ctxType) {
      case 'http':
        idUnion = this.getHTTPParams(ctx);
        break;
      case 'ws':
        idUnion = this.getWSParams(ctx);
        break;
    }

    if (!(_isNumber(idUnion[0]) && _isNumber(idUnion[1])))
      throw new UnprocessableEntityException();
    return idUnion;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [userId, roomId] = this.getParams(context);

    const isPaperSubmit = await this.examRecordService.findSubmitTime(
      roomId,
      userId,
    );
    if (isPaperSubmit) throw new UnprocessableEntityException('试卷已提交');
    return true;
  }
}

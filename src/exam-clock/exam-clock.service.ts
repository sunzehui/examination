import { Injectable } from '@nestjs/common';
import { ExamRoomService } from '@/exam-room/exam-room.service';
import { AuthService } from '@/common/module/auth/auth.service';
import { UserService } from '@/common/module/user/user.service';
import { ExamRecordService } from '@/exam-record/exam-record.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { RedisService } from 'nestjs-redis';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RecordActionType } from '@/exam-clock/dto/exam-room-eecord.dto';

dayjs.extend(utc);

@Injectable()
export class ExamClockService {
  constructor(
    private readonly examRoomService: ExamRoomService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly examRecordService: ExamRecordService,
    @InjectQueue('exam') private readonly examQueue: Queue,
    private readonly redisService: RedisService,
  ) {}
  @WebSocketServer() server: Server;
  async addForceSubmitPaperTask(roomId: number, userId: number) {
    const examEndTime = await this.examRoomService.findExamEndTime(roomId);
    const cron = dayjs(examEndTime).format('mm HH DD MM *');
    return await this.examQueue.add(
      'forceSubmit',
      { roomId, userId },
      {
        removeOnComplete: true,
        repeat: {
          limit: 1,
          cron,
        },
      },
    );
  }

  async findAll(userId: number) {
    return await this.examRoomService.findAll(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} examClock`;
  }

  async recordAnswer(
    examRoomId: number,
    userId: number,
    record: Record<number, any>,
    action: RecordActionType,
  ) {
    const client = await this.redisService.getClient();
    if (action === RecordActionType.set) {
      await client.set(`${userId}-${examRoomId}`, JSON.stringify(record));
    }
    console.log(userId, examRoomId);
    const result = await client.get(`${userId}-${examRoomId}`);
    return JSON.parse(result);
    // const existEntity = await this.examRecordService.findExist(
    //   examRecord,
    //   userId,
    // );
    // if (existEntity) return existEntity;
    // return await this.examRecordService.create(examRecord, userId);
  }

  async submitPaper(roomId: number, userId: number) {
    return await this.examRecordService.submitPaper(roomId, userId);
  }

  remove(id: number) {
    return `This action removes a #${id} examClock`;
  }
}

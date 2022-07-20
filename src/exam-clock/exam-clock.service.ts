import { Injectable } from '@nestjs/common';
import { ExamRoomService } from '@/exam-room/exam-room.service';
import { AuthService } from '@/common/module/auth/auth.service';
import { UserService } from '@/common/module/user/user.service';
import { ExamRecordDto } from '@/exam-record/dto/create-exam-record.dto';
import { ExamRecordService } from '@/exam-record/exam-record.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class ExamClockService {
  constructor(
    private readonly examRoomService: ExamRoomService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly examRecordService: ExamRecordService,
    @InjectQueue('exam') private readonly examQueue: Queue,
  ) {}

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

  async recordAnswer(examRecord: ExamRecordDto, userId: number) {
    const existEntity = await this.examRecordService.findExist(
      examRecord,
      userId,
    );
    if (existEntity) return existEntity;
    return await this.examRecordService.create(examRecord, userId);
  }

  async submitPaper(roomId: number, userId: number) {
    return await this.examRecordService.submitPaper(roomId, userId);
  }

  remove(id: number) {
    return `This action removes a #${id} examClock`;
  }
}

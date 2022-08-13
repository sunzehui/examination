import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ExamRecordService } from '@/exam-record/exam-record.service';
import { ExamRoomService } from '@/exam-room/exam-room.service';

@Processor('exam')
export class ExamProcessor {
  constructor(
    private readonly examRecordService: ExamRecordService,
    private readonly examRoomService: ExamRoomService,
  ) {}

  @Process('recordExam')
  async recordExam(job: Job) {
    console.log('Start transcoding...');
    const { userId, examRecordDto } = job.data;
    const isExist = await this.examRecordService.findExist(
      examRecordDto,
      userId,
    );
    if (isExist) return [];
    await this.examRecordService.create(examRecordDto, userId);
    console.log('Transcoding completed');
  }

  @Process('forceSubmit')
  async forceSubmit(job: Job) {
    console.log('Start forceSubmit task...');
    const { roomId, userId } = job.data;
    await this.examRecordService.setExamSubmitStatus(roomId, userId);
    console.log('submit completed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}

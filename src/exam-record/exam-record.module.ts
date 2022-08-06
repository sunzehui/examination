import { Module } from '@nestjs/common';
import { ExamRecordService } from './exam-record.service';
import { ExamRecordController } from './exam-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRecord } from '@/exam-record/entities/exam-record.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { User } from '@/common/module/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRecord, User, ExamRoom, ExamPaper])],
  controllers: [ExamRecordController],
  providers: [ExamRecordService],
  exports: [ExamRecordService],
})
export class ExamRecordModule {}

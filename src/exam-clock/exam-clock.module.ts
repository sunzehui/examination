import { Module } from '@nestjs/common';
import { ExamClockService } from './exam-clock.service';
import { ExamClockGateway } from './exam-clock.gateway';
import { AuthModule } from '@/common/module/auth/auth.module';
import { UserModule } from '@/common/module/user/user.module';
import { ExamRoomModule } from '@/exam-room/exam-room.module';
import { ExamRecordModule } from '@/exam-record/exam-record.module';
import { BullModule } from '@nestjs/bull';
import { ExamProcessor } from '@/exam-clock/exam.processor';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ExamRoomModule,
    ExamRecordModule,
    BullModule.registerQueue({
      name: 'exam',
    }),
    RedisModule.register({
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [ExamClockGateway, ExamClockService, ExamProcessor],
})
export class ExamClockModule {}

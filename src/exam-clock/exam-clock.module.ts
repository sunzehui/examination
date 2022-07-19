import { Module } from '@nestjs/common';
import { ExamClockService } from './exam-clock.service';
import { ExamClockGateway } from './exam-clock.gateway';
import { AuthModule } from '@/common/module/auth/auth.module';
import { UserModule } from '@/common/module/user/user.module';
import { ExamRoomModule } from '@/exam-room/exam-room.module';

@Module({
  imports: [AuthModule, UserModule, ExamRoomModule],
  providers: [ExamClockGateway, ExamClockService],
})
export class ExamClockModule {}

import { Module } from '@nestjs/common';
import { ExamRoomService } from './exam-room.service';
import { ExamRoomController } from './exam-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';
import { Classes } from '@/classes/entities/classes.entity';
import { User } from '@/common/module/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamRoom, Classes, User])],
  controllers: [ExamRoomController],
  providers: [ExamRoomService],
})
export class ExamRoomModule {}

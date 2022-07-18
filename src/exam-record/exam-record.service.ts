import { Injectable } from '@nestjs/common';
import { ExamRecordDto } from './dto/create-exam-record.dto';
import { Repository } from 'typeorm';
import { ExamRecord } from '@/exam-record/entities/exam-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';
import { User } from '@/common/module/user/entities/user.entity';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';

@Injectable()
export class ExamRecordService {
  constructor(
    @InjectRepository(ExamRecord)
    private readonly repo: Repository<ExamRecord>,
  ) {}

  async create(examRecordDto: ExamRecordDto, userId) {
    const examRoomEntity = new ExamRoom();
    examRoomEntity.id = examRecordDto.exam_room_id;
    const uEntity = new User();
    uEntity.id = userId;
    const examPaperEntity = new ExamPaper();
    examPaperEntity.id = examRecordDto.exam_paper_id;
    const examRecordEntity = this.repo.create({
      exam_paper: examPaperEntity,
      exam_room: examRoomEntity,
      user: uEntity,
      answer: examRecordDto.answer,
    });
    console.log(examRecordEntity);
    return await this.repo.save(examRecordEntity);
  }

  findAll() {
    return this.repo.find();
  }

  // 根据记录id查考试记录信息
  findOne(id: number) {
    console.log(id);
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'exam_room', 'exam_paper'],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} examRecord`;
  }
}

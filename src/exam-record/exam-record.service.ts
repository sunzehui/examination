import { Injectable } from '@nestjs/common';
import { ExamRecordDto } from './dto/create-exam-record.dto';
import { Repository } from 'typeorm';
import { ExamRecord } from '@/exam-record/entities/exam-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';
import { User } from '@/common/module/user/entities/user.entity';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as _get from 'lodash/get';

dayjs.extend(utc);

@Injectable()
export class ExamRecordService {
  constructor(
    @InjectRepository(ExamRecord)
    private readonly repo: Repository<ExamRecord>,
  ) {}

  async findExist(examRecordDto: ExamRecordDto, userId) {
    return this.repo.findOneBy({
      exam_room: { id: examRecordDto.exam_room_id },
      user: { id: userId },
    });
  }

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
      submit_time: dayjs().utc().format(),
    });

    return await this.repo.save(examRecordEntity);
  }

  async submitPaper(roomId, userId) {
    const recordEntity = await this.repo.findOneBy({
      exam_room: { id: roomId },
      user: { id: userId },
    });
    recordEntity.submit_time = dayjs().utc().format();
    return await this.repo.save(recordEntity);
  }

  findAll() {
    return this.repo.find();
  }

  // 根据记录id查考试记录信息
  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'exam_room', 'exam_paper'],
    });
  }

  async setExamSubmitStatus(roomId: number, userId: number) {
    try {
      const examRecordEntity = await this.repo.findOne({
        where: {
          exam_room: { id: roomId },
          user: { id: userId },
        },
      });
      if (!examRecordEntity) return;
      examRecordEntity.submit_time = dayjs().utc().format();
      await this.repo.save(examRecordEntity);
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} examRecord`;
  }

  async findSubmitTime(roomId, userId) {
    const entity = await this.repo.findOneBy({
      exam_room: { id: roomId },
      user: { id: userId },
    });
    return _get(entity, 'submit_time');
  }
}

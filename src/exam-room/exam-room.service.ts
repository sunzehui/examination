import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateExamRoomDto } from './dto/create-exam-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { Repository } from 'typeorm';
import { ExamRoom, ExamStatus } from '@/exam-room/entities/exam-room.entity';
import { Classes } from '@/classes/entities/classes.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ExamRoomService {
  constructor(
    @InjectRepository(ExamRoom)
    private readonly repo: Repository<ExamRoom>,
  ) {}

  checkExamStatus(beginTime: string, endTime: string) {
    const now = dayjs();
    const begin = dayjs(beginTime);
    const end = dayjs(endTime);
    const isBefore = now.isBefore(begin);
    const isAfter = now.isAfter(end);
    if (isBefore) {
      return ExamStatus.wait;
    } else if (isAfter) {
      return ExamStatus.off;
    }
    return ExamStatus.on;
  }

  create(createExamRoomDto: CreateExamRoomDto, userId) {
    const examPaperEntity = new ExamPaper();
    examPaperEntity.id = createExamRoomDto.exam_paper_id;

    const classesEntity = new Classes();
    classesEntity.id = createExamRoomDto.classes_id;

    const examRoomEntity = this.repo.create({
      name: createExamRoomDto.name,
      created_by: { id: userId },
      begin_time: createExamRoomDto.begin_time,
      end_time: createExamRoomDto.end_time,
    });
    examRoomEntity.use_exam_paper = examPaperEntity;
    examRoomEntity.for_classes = classesEntity;

    return this.repo.save(examRoomEntity);
  }

  // 查询该用户所有考试
  async findAll(userId, query = {}) {
    const qb = this.repo
      .createQueryBuilder('er')
      .where(query)
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('classes', 'c')
          .leftJoin('user_classes', 'uc', 'uc.classesId = c.id')
          .where('uc.userId = :userId', { userId })
          .getQuery();
        return 'forClassesId IN' + subQuery;
      })
      .getMany();

    return await qb;
  }

  async findExamEndTime(id: number) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new UnprocessableEntityException();

    return entity.end_time;
  }

  // 查询时关联试卷
  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ['use_exam_paper', 'for_classes'],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} examPaper`;
  }
}

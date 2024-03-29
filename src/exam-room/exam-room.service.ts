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
    const examRoomEntities = createExamRoomDto.classes_ids.map((cId) => {
      const examPaperEntity = new ExamPaper();
      examPaperEntity.id = createExamRoomDto.exam_paper_id;

      const classesEntity = new Classes();
      classesEntity.id = cId;

      const examRoomEntity = this.repo.create({
        name: createExamRoomDto.name,
        created_by: { id: userId },
        begin_time: createExamRoomDto.begin_time,
        end_time: createExamRoomDto.end_time,
        desc: createExamRoomDto.desc,
      });

      examRoomEntity.use_exam_paper = examPaperEntity;
      examRoomEntity.for_classes = classesEntity;
      return examRoomEntity;
    });

    return this.repo.save(examRoomEntities);
  }

  // 查询该用户所有考试
  async findAll(userId: number, query: any = {}) {
    const qb = this.repo
      .createQueryBuilder('er')
      .where((qb) => {
        // 查找用户所在班级
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('classes', 'c')
          .leftJoin('user_classes', 'uc', 'uc.classesId = c.id')
          .where('uc.userId = :userId', { userId })
          .orWhere('c.createdById = :userId', { userId })
          .getQuery();
        return 'forClassesId IN' + subQuery;
      })
      .leftJoinAndSelect(
        'er.created_by',
        'teacher',
        'er.createdById = teacher.id',
      )
      .leftJoinAndSelect(
        'er.for_classes',
        'classes',
        'er.forClassesId = classes.id',
      );

    if (query.classesId) {
      qb.andWhere('forClassesId = :id', { id: query.classesId });
    }
    return await qb.getMany();
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

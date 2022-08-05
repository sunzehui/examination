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
import { RelationCountLoader } from 'typeorm/query-builder/relation-count/RelationCountLoader';
import { RelationIdLoader } from 'typeorm/query-builder/relation-id/RelationIdLoader';
import { RawSqlResultsToEntityTransformer } from 'typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer';

dayjs.extend(utc);

@Injectable()
export class ExamRecordService {
  constructor(
    @InjectRepository(ExamRecord)
    private readonly repo: Repository<ExamRecord>,
    @InjectRepository(ExamPaper)
    private readonly examPaperRepo: Repository<ExamPaper>,
  ) {}

  async findExist(examRecordDto: ExamRecordDto, userId) {
    return this.repo.findOneBy({
      exam_room: { id: examRecordDto.exam_room_id },
      user: { id: userId },
    });
  }

  // 进入考场后保存一次，记录进入时间，计算考试用时
  async enterExamRoom(examRecordDto: ExamRecordDto, userId) {
    console.log(examRecordDto);
    const examRoomEntity = new ExamRoom();
    examRoomEntity.id = examRecordDto.exam_room_id;
    const uEntity = new User();
    uEntity.id = userId;
    const examPaperEntity = await this.examPaperRepo.findOne({
      where: { id: examRecordDto.exam_paper_id },
      relations: ['created_by'],
    });
    const teacher = examPaperEntity.created_by;

    const examRecordEntity = this.repo.create({
      exam_paper: examPaperEntity,
      exam_room: examRoomEntity,
      user: uEntity,
      rel_teacher: teacher,
    });
    return await this.repo.save(examRecordEntity);
  }

  async create(examRecordDto: ExamRecordDto, userId) {
    const examRoomId = examRecordDto.exam_room_id;
    const updateQb = this.repo
      .createQueryBuilder('e_record')
      .where('examRoomId = :examRoomId', { examRoomId })
      .where('userId = :userId', { userId })
      .update({
        score: examRecordDto.score,
        answer: examRecordDto.answer,
        submit_time: dayjs().utc().format(),
      });
    return await updateQb.execute();
  }

  async submitPaper(roomId, userId) {
    const recordEntity = await this.repo.findOneBy({
      exam_room: { id: roomId },
      user: { id: userId },
    });
    recordEntity.submit_time = dayjs().utc().format();
    return await this.repo.save(recordEntity);
  }

  async findAll(userId) {
    const qb = this.repo
      .createQueryBuilder('e_record')
      .addSelect('avg(e_record.score)', 'averageScore')
      .where('userId = :userId', { userId })
      .orWhere('e_record.relTeacherId = :userId', { userId })
      .leftJoinAndSelect(
        'e_record.exam_room',
        'e_room',
        'e_room.id = e_record.examRoomId',
      )
      .leftJoinAndSelect(
        'e_room.for_classes',
        'classes',
        'classes.id = e_room.for_classes',
      )
      .leftJoinAndSelect(
        'e_record.exam_paper',
        'e_paper',
        'e_paper.id = e_record.examPaperId',
      )
      .groupBy('e_record.relTeacherId');
    const rawResults = await qb.getRawMany();
    console.log(rawResults);

    const avgScoreList = rawResults.map((entity) => ({
      id: entity.e_record_id,
      score: entity.averageScore,
    }));
    const connection = this.repo.manager.connection;

    const queryRunner = connection.createQueryRunner();
    const relationIdLoader = new RelationIdLoader(
      connection,
      queryRunner,
      qb.expressionMap.relationIdAttributes,
    );
    const relationCountLoader = new RelationCountLoader(
      connection,
      queryRunner,
      qb.expressionMap.relationCountAttributes,
    );

    const rawRelationIdResults = await relationIdLoader.load(rawResults);
    const rawRelationCountResults = await relationCountLoader.load(rawResults);
    const transformer = new RawSqlResultsToEntityTransformer(
      qb.expressionMap,
      connection.driver,
      rawRelationIdResults,
      rawRelationCountResults,
      queryRunner,
    );
    const transformed = transformer.transform(
      rawResults,
      qb.expressionMap.mainAlias,
    );
    return transformed.map((entity) => {
      const avgScore =
        avgScoreList.find((score) => score.id === entity.id)?.score || 0;
      return {
        ...entity,
        avgScore,
      };
    });
  }

  async statisticScore(userId: number, roomId: number) {
    const qb = this.repo
      .createQueryBuilder('e_record')
      .where((qb) => {
        // 查找用户所在班级
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('classes', 'c')
          .leftJoin('user_classes', 'uc', 'uc.classesId = c.id')
          .where('uc.userId = :userId', { userId })
          .getQuery();
        return 'forClassesId IN' + subQuery;
      })
      .where('e_record.examRoomId = :roomId', { roomId })
      .leftJoinAndSelect(
        'e_record.rel_teacher',
        'teacher',
        'e_record.rel_teacher = teacher.id',
      )
      .leftJoinAndSelect(
        'e_record.exam_room',
        'e_room',
        'e_room.id = e_record.examRoomId',
      )
      .leftJoinAndSelect(
        'e_room.for_classes',
        'classes',
        'e_room.forClassesId = classes.id',
      )
      .getMany();
    return await qb;
  }

  // 根据记录id查考试记录信息
  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'exam_room.for_classes', 'exam_paper'],
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

  // 没有提交时间代表从未提交
  async findSubmitTime(roomId, userId) {
    const entity = await this.repo.findOneBy({
      exam_room: { id: roomId },
      user: { id: userId },
    });
    return _get(entity, 'submit_time');
  }
}

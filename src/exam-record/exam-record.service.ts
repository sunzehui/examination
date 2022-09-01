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
import * as _pick from 'lodash/pick';
import { RelationCountLoader } from 'typeorm/query-builder/relation-count/RelationCountLoader';
import { RelationIdLoader } from 'typeorm/query-builder/relation-id/RelationIdLoader';
import { RawSqlResultsToEntityTransformer } from 'typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer';
import { Classes } from '@/classes/entities/classes.entity';
import { writeHeapSnapshot } from 'v8';

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
    const examRoomEntity = new ExamRoom();
    examRoomEntity.id = examRecordDto.exam_room_id;
    const uEntity = new User();
    uEntity.id = userId;
    console.log(examRecordDto);
    const examPaperEntity = await this.examPaperRepo.findOne({
      where: { id: examRecordDto.exam_room_id },
      relations: ['created_by'],
    });
    const teacher = examPaperEntity.created_by;

    const examRecordEntity = this.repo.create({
      // exam_paper: examPaperEntity,
      exam_room: examRoomEntity,
      user: uEntity,
      rel_teacher: teacher,
    });
    return await this.repo.save(examRecordEntity);
  }

  async create(examRecordDto: ExamRecordDto, userId) {
    const examRoomId = examRecordDto.exam_room_id;
    const examPaperEntity = new ExamPaper();
    examPaperEntity.id = examRecordDto.exam_paper_id;
    const updateQb = this.repo
      .createQueryBuilder('e_record')
      .where('examRoomId = :examRoomId', { examRoomId })
      .where('userId = :userId', { userId })
      .update({
        score: examRecordDto.score,
        answer: examRecordDto.answer,
        exam_paper: examPaperEntity,
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
      .groupBy('e_room.for_classes');
    const rawResults = await qb.getRawMany();

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
  // 查出该班所有学生的成绩和我的成绩
  async getUserStatisticScore(userId: number, classesId: number) {
    const records = await this.repo
      .createQueryBuilder('e_record')
      .where('e_room.forClassesId = :classesId', { classesId })
      .leftJoin(
        'e_record.rel_teacher',
        'teacher',
        'e_record.rel_teacher = teacher.id',
      )
      .leftJoin(
        'e_record.exam_room',
        'e_room',
        'e_room.id = e_record.examRoomId',
      )
      .leftJoin(
        'e_room.for_classes',
        'classes',
        'e_room.forClassesId = classes.id',
      )
      // .where('e_record.userId != :userId', { userId })
      .getMany();

    // const myRecord = await this.repo.findOneBy({ user: { id: userId } });
    return {
      other: records.map((r) => r.score),
      // mine: myRecord.score,
    };
  }
  // 按班级查询学生分数
  // 查出该班级所有学生，查分数
  async findClassesStaticScore(classesId: number, roomId: number) {
    const entitiesResult = await this.repo
      .createQueryBuilder('e_record')
      .where((qb) => {
        const userIdsQB = qb
          .subQuery()
          .select('id')
          .where('uc.classesId = :classesId', { classesId })
          .leftJoin('user_classes', 'uc')
          .from('user', 'user')
          .getQuery();
        return 'e_record.userId IN (' + userIdsQB + ')';
      })
      .where('e_record.examRoomId = :roomId', { roomId })
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
      .leftJoinAndSelect('e_record.user', 'user')
      .getMany();
    // 查该用户的信息不是全部
    return this.liftClassesEntity(entitiesResult);
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

  // 没有提交时间代表从未提交
  async findSubmitTime(roomId, userId) {
    const entity = await this.repo.findOneBy({
      exam_room: { id: roomId },
      user: { id: userId },
    });
    return _get(entity, 'submit_time');
  }

  private liftClassesEntity(entitiesResult: ExamRecord[]) {
    return entitiesResult.map((_record) => {
      const user = _pick(_record.user, ['id', 'nickname', 'username']);
      const exam_room = _pick(_record.exam_room, ['name']);
      const classes = _pick(_record.exam_room.for_classes, ['name']);
      const record = _pick(_record, [
        'id',
        'score',
        'create_time',
        'submit_time',
      ]);
      return {
        user,
        exam_room,
        classes,
        ...record,
      };
    });
  }
}

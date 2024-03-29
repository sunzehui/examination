import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateExamPaperDto } from './dto/create-exam-paper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { Repository } from 'typeorm';
import { Question } from '@/question/entities/question.entity';
import { QuestionService } from '@/question/question.service';
import { ExamineesPaperDto } from '@/exam-paper/dto/examinees-paper.dto';
import * as _remove from 'lodash/remove';
@Injectable()
export class ExamPaperService {
  constructor(
    @InjectRepository(ExamPaper)
    private readonly repo: Repository<ExamPaper>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    private readonly questionService: QuestionService,
  ) {}

  async create(createExamPaperDto: CreateExamPaperDto, userId) {
    const examPaperEntity = this.repo.create({
      name: createExamPaperDto.name,
      created_by: { id: userId },
    });

    return await this.repo.save(examPaperEntity);
  }

  async findAll(where) {
    return this.repo.find({
      where,
    });
  }
  async findMine(userId: number) {
    return await this.repo.find({
      where: {
        created_by: { id: userId },
      },
    });
  }

  //查询时关联所有问题
  async findOne(id: number, showAnswer = false) {
    const paperEntity = await this.repo.findOne({
      where: { id },
      relations: ['has_Q'],
    });
    const ids = paperEntity.has_Q.map((q) => q.id);
    const allQEntities = await this.questionService.findIn(ids, showAnswer);

    return {
      id: paperEntity.id,
      name: paperEntity.name,
      desc: paperEntity.desc,
      totalScore: paperEntity.total_score,
      question: allQEntities,
    };
  }

  async settlement(id: number, examineesPaperDto: ExamineesPaperDto[]) {
    //  get all q_id 's answer
    const examPaperEntity = await this.findOne(id, true);
    //  put in questionService(answer, dto)
    return await this.questionService.checkQuestionAnswer(
      examPaperEntity.question,
      examineesPaperDto,
    );
  }

  async refreshTotalScore(eId) {
    const paperEntity = await this.repo.findOne({
      where: { id: eId },
      relations: ['has_Q'],
    });
    const total_score = paperEntity.has_Q.reduce((acc, cur) => {
      return acc + cur.score;
    }, 0);
    await this.repo.update(
      { id: eId },
      {
        total_score,
      },
    );
  }

  async addQuestion(eId: number, qId: number) {
    const examPaperEntity = await this.repo.findOne({
      where: { id: eId },
      relations: ['has_Q'],
    });
    const qEntity = await this.questionRepo.findOne({
      where: { id: qId },
    });
    examPaperEntity.has_Q.push(qEntity);
    const result = await this.repo.save(examPaperEntity);
    await this.refreshTotalScore(eId);
    return result;
  }

  async removeQuestion(eId: number, qId: number) {
    const examPaperEntity = await this.repo.findOne({
      where: { id: eId },
      relations: ['has_Q'],
    });
    const qEntity = new Question();
    qEntity.id = qId;
    _remove(examPaperEntity.has_Q, (entity) => entity.id === qId);
    const result = await this.repo.save(examPaperEntity);
    await this.refreshTotalScore(eId);
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} examPaper`;
  }
}

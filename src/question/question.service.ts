import { HttpException, Injectable } from '@nestjs/common';
import { QType, QuestionDto } from './dto/question.dto';
import { ChoiceService } from '@/question/service/choice.service';
import { FillBlankService } from '@/question/service/fillBlank.service';
import {
  Question,
  Question as QEntity,
} from '@/question/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _pick from 'lodash/pick';
import * as _isEmpty from 'lodash/isEmpty';
import { ExamineesPaperDto } from '@/exam-paper/dto/examinees-paper.dto';
import * as _keyBy from 'lodash/keyBy';

@Injectable()
export class QuestionService {
  constructor(
    private readonly choiceService: ChoiceService,
    private readonly fillBlankService: FillBlankService,
    @InjectRepository(Question)
    private readonly repo: Repository<Question>,
  ) {}

  async create(createQuestionListDto: QuestionDto[]) {
    const qEntities = await Promise.all(
      createQuestionListDto.map(async (q) => await this.createQEntity(q)),
    );
    return await this.repo.save(qEntities);
  }

  private async createQEntity(fcEntity: QuestionDto): Promise<Question> {
    const qEntity = new QEntity();
    let answerEntity = null;
    switch (fcEntity.type) {
      case QType.choice:
        answerEntity = await this.choiceService.create(fcEntity.answer);
        qEntity.choice = answerEntity;
        qEntity.q_type = QType.choice;
        break;
      case QType.fill_blank:
        answerEntity = await this.fillBlankService.create(fcEntity.answer);
        qEntity.fill_blank = answerEntity;
        qEntity.q_type = QType.fill_blank;
        break;
      default:
        throw new HttpException('不支持的题目类型', 400);
    }
    qEntity.content = fcEntity.content;
    qEntity.resolution = fcEntity.resolution;
    qEntity.score = fcEntity.score;
    return qEntity;
  }

  private static sanitizeQEntity(_qEntity): QuestionDto {
    const qEntity = _pick(_qEntity, [
      'id',
      'content',
      'resolution',
      'create_time',
      'score',
    ]);
    qEntity.type = _qEntity.q_type;
    switch (_qEntity.q_type) {
      case QType.choice:
        qEntity.answer = _qEntity.choice;
        break;
      case QType.fill_blank:
        qEntity.answer = _qEntity.fill_blank;
        break;
      default:
        qEntity.answer = null;
        throw new HttpException('不支持的题目类型', 400);
    }
    return qEntity;
  }

  async findOne(id: number): Promise<QuestionDto> {
    const qEntity = await this.repo.findOne({
      where: { id },
      relations: ['choice', 'fill_blank'],
    });
    if (!qEntity) return null;
    return QuestionService.sanitizeQEntity(qEntity);
  }

  async findIn(ids: number[], showAnswer = false): Promise<QuestionDto[]> {
    if (_isEmpty(ids)) return [];

    const qb = this.repo
      .createQueryBuilder('q')
      .where('q.id in (:ids)', { ids })
      .leftJoinAndSelect('q.choice', 'choice')
      .leftJoinAndSelect('q.fill_blank', 'fill_blank');

    if (showAnswer) {
      qb.addSelect('choice.is_answer').addSelect('fill_blank.content');
    }
    const qEntities = await qb.getMany();
    if (_isEmpty(qEntities)) return [];
    return qEntities.map((q) => QuestionService.sanitizeQEntity(q));
  }

  async checkQuestionAnswer(
    qDtoList: QuestionDto[],
    eDtoList: ExamineesPaperDto[],
  ) {
    const answerChoice = qDtoList.filter((value) => value.type == QType.choice);
    const answerFB = qDtoList.filter((value) => value.type == QType.fill_blank);
    let totalScore = 0;
    function checkQ(item) {
      let isAnswerTruly = false;
      let result = {};
      switch (item.type) {
        case QType.choice:
          const standChoice = answerChoice.find((q) => q.id === item.qId);
          const choiceAnswer = _keyBy(standChoice.answer, 'id');
          isAnswerTruly = item.answer.every((aId: number) => {
            return choiceAnswer[aId].is_answer;
          });

          const _qScore = isAnswerTruly ? standChoice.score : 0;

          totalScore += _qScore;
          result = {
            standAnswer: standChoice,
            userAnswer: item.answer,
            isAnswerTruly,
            qScore: _qScore,
            type: QType.choice,
          };
          break;
        case QType.fill_blank:
          const standFB = answerFB.find((q) => q.id === item.qId);
          const fBAnswer = _keyBy(standFB.answer, 'id');
          let qScore = 0;
          const userAnswer = item.answer.map((a) => {
            isAnswerTruly = fBAnswer[a.id].content == a.content.trim();
            qScore += isAnswerTruly ? fBAnswer[a.id].score : 0;
            return {
              isAnswerTruly,
              pos: a.pos,
              content: a.content,
            };
          });

          totalScore += qScore;
          result = {
            standAnswer: standFB,
            userAnswer,
            type: QType.fill_blank,
            qScore,
          };
          break;
      }
      return result;
    }

    return {
      answerRecord: eDtoList.map(checkQ),
      totalScore,
    };
  }
}

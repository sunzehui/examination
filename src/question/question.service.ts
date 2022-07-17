import { HttpException, Injectable } from '@nestjs/common';
import { QuestionDto, QType } from './dto/question.dto';
import { ChoiceService } from '@/question/service/choice.service';
import { FillBlankService } from '@/question/service/fillBlank.service';
import {
  Question,
  Question as QEntity,
} from '@/question/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as _pick from 'lodash/pick';
import * as _isEmpty from 'lodash/isEmpty';

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

  async createQEntity(fcEntity: QuestionDto): Promise<Question> {
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
    return qEntity;
  }

  findAll() {
    return `This action returns all question`;
  }

  sanitizeQEntity(_qEntity): QuestionDto {
    const qEntity = _pick(_qEntity, [
      'id',
      'content',
      'resolution',
      'create_time',
      'q_type',
    ]);
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
    return this.sanitizeQEntity(qEntity);
  }

  async findIn(ids: number[]): Promise<QuestionDto[]> {
    console.log('id', ids);
    const qEntities = await this.repo.find({
      where: { id: In(ids) },
      relations: ['choice', 'fill_blank'],
    });
    if (_isEmpty(qEntities)) return [];
    return qEntities.map((q) => this.sanitizeQEntity(q));
  }

  //
  // update(id: number, updateQuestionDto: UpdateQuestionDto) {
  //   return `This action updates a #${id} question`;
  // }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}

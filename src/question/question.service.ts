import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuestionDTO, QType } from './dto/create-question.dto';
import { ChoiceService } from '@/question/service/choice.service';
import { FillBlankService } from '@/question/service/fillBlank.service';
import {
  Question,
  Question as QEntity,
} from '@/question/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _pick from 'lodash/pick';

@Injectable()
export class QuestionService {
  constructor(
    private readonly choiceService: ChoiceService,
    private readonly fillBlankService: FillBlankService,
    @InjectRepository(Question)
    private readonly repo: Repository<Question>,
  ) {}

  async create(createQuestionListDto: CreateQuestionDTO[]) {
    const qEntities = await Promise.all(
      createQuestionListDto.map(async (q) => await this.createQEntity(q)),
    );
    return await this.repo.save(qEntities);
  }

  async createQEntity(fcEntity: CreateQuestionDTO) {
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

  async findOne(id: number) {
    const _qEntity = await this.repo.findOne({
      where: { id },
      relations: ['choice', 'fill_blank'],
    });

    if (!_qEntity) return null;
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

  //
  // update(id: number, updateQuestionDto: UpdateQuestionDto) {
  //   return `This action updates a #${id} question`;
  // }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}

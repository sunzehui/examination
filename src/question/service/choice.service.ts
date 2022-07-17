import { Injectable } from '@nestjs/common';
import { Choice } from '@/question/dto/question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceQ } from '@/question/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(ChoiceQ)
    private readonly repo: Repository<ChoiceQ>,
  ) {}

  async create(choiceList: Choice[]): Promise<ChoiceQ[]> {
    return await Promise.all(
      choiceList.map((choice) => {
        const newChoiceEntity = new ChoiceQ();
        newChoiceEntity.content = choice.content;
        newChoiceEntity.is_answer = choice.is_answer;
        return this.repo.save(newChoiceEntity);
      }),
    );
  }
}

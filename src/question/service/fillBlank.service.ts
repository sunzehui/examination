import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FillBlankQ } from '@/question/entities/question.entity';
import { FillBlank } from '@/question/dto/question.dto';

@Injectable()
export class FillBlankService {
  constructor(
    @InjectRepository(FillBlankQ)
    private readonly repo: Repository<FillBlankQ>,
  ) {}

  // 创建填空题实体

  async create(choiceList: FillBlank[]): Promise<FillBlankQ[]> {
    return await Promise.all(
      choiceList.map((fb) => {
        const newFBEntity = new FillBlankQ();
        newFBEntity.content = fb.content;
        newFBEntity.pos = fb.pos;
        return this.repo.save(newFBEntity);
      }),
    );
  }
}

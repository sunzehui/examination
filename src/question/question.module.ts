import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import {
  FillBlankQ,
  ChoiceQ,
  Question,
} from '@/question/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FillBlankService } from '@/question/service/fillBlank.service';
import { ChoiceService } from '@/question/service/choice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, ChoiceQ, FillBlankQ])],
  controllers: [QuestionController],
  providers: [QuestionService, ChoiceService, FillBlankService],
})
export class QuestionModule {}

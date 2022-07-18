import { Module } from '@nestjs/common';
import { ExamPaperService } from './exam-paper.service';
import { ExamPaperController } from './exam-paper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { QuestionModule } from '@/question/question.module';
import {
  ChoiceQ,
  FillBlankQ,
  Question,
} from '@/question/entities/question.entity';
import { QuestionService } from '@/question/question.service';
import { ChoiceService } from '@/question/service/choice.service';
import { FillBlankService } from '@/question/service/fillBlank.service';
import { ExamRecordModule } from '@/exam-record/exam-record.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPaper, Question, ChoiceQ, FillBlankQ]),
    QuestionModule,
    ExamRecordModule,
  ],
  controllers: [ExamPaperController],
  providers: [
    ExamPaperService,
    QuestionService,
    ChoiceService,
    FillBlankService,
  ],
})
export class ExamPaperModule {}

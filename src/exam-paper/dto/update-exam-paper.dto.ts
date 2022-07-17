import { PartialType } from '@nestjs/mapped-types';
import { CreateExamPaperDto } from './create-exam-paper.dto';

export class UpdateExamPaperDto extends PartialType(CreateExamPaperDto) {
}

export class AddQuestionDto {
  q_id: number;
  p_id: number;

}

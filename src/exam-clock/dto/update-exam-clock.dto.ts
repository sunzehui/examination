import { PartialType } from '@nestjs/mapped-types';
import { CreateExamClockDto } from './create-exam-clock.dto';

export class UpdateExamClockDto extends PartialType(CreateExamClockDto) {
  id: number;
}

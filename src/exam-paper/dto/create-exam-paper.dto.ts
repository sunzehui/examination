import { IsNotEmpty } from 'class-validator';

export class CreateExamPaperDto {
  @IsNotEmpty()
  name: string;
}

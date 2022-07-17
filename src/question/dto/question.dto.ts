import { IsNotEmpty } from 'class-validator';

export enum QType {
  choice,
  fill_blank,
}

export class FillBlank {
  @IsNotEmpty()
  pos: string;
  @IsNotEmpty()
  content: string;
}

export class Choice {
  content: string;
  is_answer: boolean;
  resolution: string;
}

export type QuestionDto = (
  | {
      type: QType.choice;
      answer: Choice[];
    }
  | {
      type: QType.fill_blank;
      answer: FillBlank[];
    }
) & {
  content: string;
  resolution: string;
};

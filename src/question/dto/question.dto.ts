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
  @IsNotEmpty()
  is_answer: boolean;
  resolution: string;
  score: number;
}

export class BaseQuestion {
  @IsNotEmpty()
  content: string;
  resolution: string;
  id?: number;
  score: number;
}

export class ChoiceQuestion extends BaseQuestion {
  type: QType.choice;
  answer: Choice[];
}

export class FillBlankQuestion extends BaseQuestion {
  type: QType.fill_blank;
  answer: FillBlank[];
}

export type QuestionDto = ChoiceQuestion | FillBlankQuestion;
// export type QuestionDto = (
//   | {
//       type: QType.choice;
//       answer: Choice[];
//     }
//   | {
//       type: QType.fill_blank;
//       answer: FillBlank[];
//     }
// ) & {
//   content: string;
//   resolution: string;
//   id?: number;
// };

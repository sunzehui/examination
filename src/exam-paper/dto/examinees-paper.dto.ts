import { Choice, FillBlank, QType } from '@/question/dto/question.dto';

export type ExamineesPaperDto = (
  | {
      type: QType.choice;
      answer: Choice[];
    }
  | {
      type: QType.fill_blank;
      answer: FillBlank[];
    }
) & {
  qId: number;
};

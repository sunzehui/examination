export class ExamRecord {
  id?: number;
  exam_paper_id: number;
  answer: string;
  exam_room_id: number;
}

export type ExamRecordDto = Partial<ExamRecord>;

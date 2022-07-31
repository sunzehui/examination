export class CreateExamRoomDto {
  name: string;
  exam_paper_id: number;
  classes_ids: number[];
  begin_time: string;
  desc: string;
  end_time: string;
}

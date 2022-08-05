import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateExamRoomDto {
  @IsString()
  name: string;
  @IsNumber()
  exam_paper_id: number;
  @IsArray()
  classes_ids: number[];
  @IsString()
  begin_time: string;
  @IsString()
  desc: string;
  @IsString()
  end_time: string;
}

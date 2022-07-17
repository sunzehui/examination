import { PartialType } from '@nestjs/mapped-types';
import { CreateExamRoomDto } from './create-exam-room.dto';

export class UpdateExamRoomDto extends PartialType(CreateExamRoomDto) {}

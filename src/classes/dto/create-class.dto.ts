import { IsArray, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @IsArray()
  students: Array<number>
}

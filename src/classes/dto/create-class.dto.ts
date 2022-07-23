import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

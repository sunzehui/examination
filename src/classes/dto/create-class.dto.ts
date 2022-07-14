import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  name: string;
}

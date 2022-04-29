import { IsNotEmpty, IsString } from 'class-validator';

export class BoardDeleteDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}

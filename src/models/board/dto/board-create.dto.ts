import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class BoardCreateDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  writer: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

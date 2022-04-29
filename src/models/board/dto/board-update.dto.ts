import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BoardUpdateDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

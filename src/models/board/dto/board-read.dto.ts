import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class BoardReadDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  writer?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  cursor: number; // boardId

  @IsNumber()
  @Type(() => Number)
  @Min(5)
  @Max(20)
  limit = 5;

  @IsString()
  type: 'lt' | 'gt' = 'lt';
}

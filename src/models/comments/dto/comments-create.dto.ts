import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../entities/comment.entity';

export class CommentsCreateDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parentId?: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  writer: string;
}

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { CommentsReadDto } from './dto/comments-read.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/list/board/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(@Param('id') id: string, @Query() query: CommentsReadDto) {
    if (isNaN(Number(id))) return new NotFoundException();

    return this.commentsService.getList(Number(id), query);
  }

  @Post('/create/board/:id')
  @UsePipes(ValidationPipe)
  async create(@Param('id') id: string, @Body() body: CommentsCreateDto) {
    if (isNaN(Number(id))) return new NotFoundException();

    return this.commentsService.create(Number(id), body);
  }
}

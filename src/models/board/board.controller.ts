import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardDeleteDto } from './dto/board-delete.dto';
import { BoardReadDto } from './dto/board-read.dto';
import { BoardUpdateDto } from './dto/board-update.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(@Query() query: BoardReadDto) {
    return this.boardService.getList(query);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() body: BoardCreateDto) {
    return this.boardService.create(body);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() body: BoardUpdateDto) {
    if (isNaN(Number(id))) return new NotFoundException();

    return this.boardService.update(Number(id), body);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: string, @Body() body: BoardDeleteDto) {
    if (isNaN(Number(id))) return new NotFoundException();

    return this.boardService.delete(Number(id), body);
  }
}

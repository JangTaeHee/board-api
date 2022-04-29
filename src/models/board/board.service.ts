import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '@root/config/app/config.service';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardUpdateDto } from './dto/board-update.dto';
import { Board } from './entities/board.entity';
import { IBoard } from './interfaces/board.interface';
import { encryptedPassword } from '@root/common/utils';
import { BoardDeleteDto } from './dto/board-delete.dto';
import { BoardReadDto } from './dto/board-read.dto';
import _ from 'lodash';
import { KeywordService } from '../keyword/keyword.service';

@Injectable()
export class BoardService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly config: AppConfigService,
    private readonly keywordService: KeywordService,
  ) {}

  async getList(query: BoardReadDto): Promise<Board[]> {
    this.logger.debug('[BoardService/getList] call');

    let queryString = '';

    if (query && query.cursor) {
      if (query.type === 'lt') {
        queryString += `id < :cursor`;
      } else {
        queryString += `id > :cursor`;
      }
    }

    if (query.subject) {
      if (queryString.length > 0) {
        queryString += ' and subject like :subject';
      } else {
        queryString += 'subject like :subject';
      }
    }

    if (query.writer) {
      if (queryString.length > 0) {
        queryString += ' and writer like :writer';
      } else {
        queryString += 'writer like :writer';
      }
    }

    return await this.boardRepository
      .createQueryBuilder()
      .where(queryString, {
        cursor: query.cursor,
        subject: `%${query.subject}%`,
        writer: `%${query.writer}%`,
      })
      .orderBy('id', 'DESC')
      .limit(query.limit)
      .getMany();
  }

  async create(body: BoardCreateDto): Promise<Board> {
    this.logger.debug('[BoardService/create] call');

    body.password = encryptedPassword(body.password, this.config.secret);

    try {
      const board = this.boardRepository.create(body);

      const result = await this.boardRepository.save(board);

      this.keywordService.checkKeyword(body.writer, result);

      delete result.password;

      return result;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async update(id: number, body: BoardUpdateDto): Promise<any> {
    this.logger.debug('[BoardService/update] call');

    const password = encryptedPassword(body.password, this.config.secret);

    try {
      const updatedItem: UpdateResult = await this.boardRepository
        .createQueryBuilder()
        .update({
          subject: body.subject,
          content: body.content,
          updatedAt: new Date(),
        })
        .where('id = :id and password = :password', { id, password })
        .execute();

      if (updatedItem.affected > 0) {
        return await this.boardRepository.findOne({ where: { id } });
      } else {
        return new BadRequestException('invalid id or password');
      }
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async delete(id: number, body: BoardDeleteDto): Promise<any> {
    this.logger.debug('[BoardService/delete] call');

    const password = encryptedPassword(body.password, this.config.secret);

    try {
      const result: DeleteResult = await this.boardRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id and password = :password', { id, password })
        .execute();

      if (result.affected > 0) {
        return;
      } else {
        return new BadRequestException('invalid id or password');
      }
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}

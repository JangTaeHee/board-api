import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { KeywordService } from '../keyword/keyword.service';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { CommentsReadDto } from './dto/comments-read.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(Comment)
    private readonly commentRepository: TreeRepository<Comment>,
    private readonly keywordService: KeywordService,
  ) {}

  async getList(boardId: number, query: CommentsReadDto): Promise<Comment[]> {
    this.logger.debug('[CommentsService/getList] call');

    let queryString = 'boardId = :boardId and parentId is NULL';

    if (query && query.cursor) {
      if (query.type === 'lt') {
        queryString += ` and id < :cursor`;
      } else {
        queryString += ` and id > :cursor`;
      }
    }

    try {
      const comments: Comment[] = await this.commentRepository
        .createQueryBuilder()
        .where(queryString, {
          boardId,
          cursor: query.cursor,
        })
        .orderBy('id', 'DESC')
        .limit(query.limit)
        .getMany();

      const manager = this.commentRepository.manager;

      const findChild = (parent: Comment) =>
        manager.getTreeRepository(Comment).findDescendantsTree(parent);

      return await Promise.all(comments.map((i) => findChild(i)));
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async create(boardId: number, body: CommentsCreateDto): Promise<any> {
    this.logger.debug('[CommentsService/create] call');

    if (body.parentId) {
      let parent: Comment;
      try {
        parent = await this.commentRepository.findOne({
          where: { id: body.parentId },
        });

        if (parent.boardId !== boardId) {
          return new BadRequestException('invalid board id');
        }
      } catch (error) {
        this.logger.error(error);
        return error;
      }

      const child = this.commentRepository.create(
        Object.assign(body, { boardId }),
      );
      child.parent = parent;

      const result = await this.commentRepository.save(child);

      this.keywordService.checkKeyword(body.writer, result);

      return result;
    } else {
      const comment = this.commentRepository.create(
        Object.assign(body, { boardId }),
      );

      const result = await this.commentRepository.save(comment);

      this.keywordService.checkKeyword(body.writer, result);

      return result;
    }
  }
}

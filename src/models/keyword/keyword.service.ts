import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notification } from '@root/common/utils';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Keyword } from './entities/keyword.entity';

@Injectable()
export class KeywordService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,
  ) {}

  async checkKeyword(writer: string, item: Board | Comment): Promise<void> {
    this.logger.debug('[CommentsService/create] call');

    try {
      const keyword = await this.keywordRepository.findOne({
        where: { writer },
      });

      const includeKeywords = keyword.keyword
        .split(',')
        .filter((i) => item.content.includes(i));

      if (includeKeywords.length > 0) {
        notification(writer, item, includeKeywords);
      }
    } catch (error) {
      this.logger.error(error);
      return error;
    }

    return;
  }
}

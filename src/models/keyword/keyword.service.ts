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
      const keywords = await this.keywordRepository.find();

      keywords.forEach((k) => {
        const includeKeywords = k.keyword
          .split(',')
          .filter((i) => item.content.includes(i));

        if (includeKeywords.length > 0) {
          notification(writer, item, includeKeywords);
        }
      });

      // TODO - mysql 'like' query after keyword extraction
    } catch (error) {
      this.logger.error(error);
      return error;
    }

    return;
  }
}

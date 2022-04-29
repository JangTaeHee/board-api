import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { KeywordModule } from '../keyword/keyword.module';
import { KeywordService } from '../keyword/keyword.service';
import { Keyword } from '../keyword/entities/keyword.entity';

const mockPostRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: MockRepository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [
        Logger,
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockPostRepository(),
        },
        KeywordService,
        {
          provide: getRepositoryToken(Keyword),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<MockRepository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

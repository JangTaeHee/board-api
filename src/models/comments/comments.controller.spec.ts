import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { CommentsController } from './comments.controller';
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

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentRepository: MockRepository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      controllers: [CommentsController],
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

    controller = module.get<CommentsController>(CommentsController);
    commentRepository = module.get<MockRepository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

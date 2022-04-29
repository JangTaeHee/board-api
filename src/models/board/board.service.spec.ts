import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { KeywordModule } from '../keyword/keyword.module';
import { Keyword } from '../keyword/entities/keyword.entity';
import { KeywordService } from '../keyword/keyword.service';

const mockPostRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardService', () => {
  let service: BoardService;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [
        Logger,
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useValue: mockPostRepository(),
        },
        KeywordService,
        {
          provide: getRepositoryToken(Keyword),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

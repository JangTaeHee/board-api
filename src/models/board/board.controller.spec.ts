import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { KeywordModule } from '../keyword/keyword.module';
import { KeywordService } from '../keyword/keyword.service';
import { Keyword } from '../keyword/entities/keyword.entity';

const mockPostRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardController', () => {
  let controller: BoardController;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      controllers: [BoardController],
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

    controller = module.get<BoardController>(BoardController);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

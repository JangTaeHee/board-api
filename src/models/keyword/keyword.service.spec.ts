import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { KeywordService } from './keyword.service';
import { Keyword } from './entities/keyword.entity';

const mockPostRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('KeywordService', () => {
  let service: KeywordService;
  let keywordRepository: MockRepository<Keyword>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [
        Logger,
        KeywordService,
        {
          provide: getRepositoryToken(Keyword),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<KeywordService>(KeywordService);
    keywordRepository = module.get<MockRepository<Keyword>>(
      getRepositoryToken(Keyword),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

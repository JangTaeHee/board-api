import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { AppConfigService } from './config.service';
import configuration from './configuration';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            APP_ENV: Joi.string().default('development'),
            APP_NAME: Joi.string().default('App'),
            APP_PORT: Joi.number().default('8080'),
            APP_SECRET: Joi.string().default('wantedlab'),
          }),
        }),
      ],
      providers: [AppConfigService],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get config', () => {
    it('should return env', async () => {
      expect(service.env).toBe(process.env.APP_ENV);
    });
  });
});

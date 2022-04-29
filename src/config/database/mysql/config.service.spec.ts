import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { MySqlDatabaseConfigService } from './config.service';
import configuration from './configuration';

describe('MySqlDatabaseConfigService', () => {
  let service: MySqlDatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            APP_DATABASE_TYPE: Joi.string().default('mysql'),
            APP_MYSQL_DATABASE_DEV_HOST: Joi.string().default('localhost'),
            APP_MYSQL_DATABASE_PROD_HOST: Joi.string().default('localhost'),
            APP_MYSQL_DATABASE_DEV_PORT: Joi.string().default(3306),
            APP_MYSQL_DATABASE_PROD_PORT: Joi.string().default(3306),
            APP_MYSQL_DATABASE_DEV_DB: Joi.string().default('test'),
            APP_MYSQL_DATABASE_PROD_DB: Joi.string().default('test'),
            APP_MYSQL_DATABASE_DEV_USER: Joi.string().default('test'),
            APP_MYSQL_DATABASE_PROD_USER: Joi.string().default('test'),
            APP_MYSQL_DATABASE_DEV_PW: Joi.string().default('test'),
            APP_MYSQL_DATABASE_PROD_PW: Joi.string().default('test'),
          }),
        }),
      ],
      providers: [MySqlDatabaseConfigService],
    }).compile();

    service = module.get<MySqlDatabaseConfigService>(
      MySqlDatabaseConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get database config', () => {
    it('should return env', async () => {
      expect(service.host).toBe(
        process.env.APP_ENV === 'development'
          ? process.env.APP_MYSQL_DATABASE_DEV_HOST
          : process.env.APP_MYSQL_DATABASE_PROD_HOST,
      );
    });
  });
});

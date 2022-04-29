import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { MySqlDatabaseConfigService } from './config.service';
import configuration from './configuration';

@Module({
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
  providers: [ConfigService, MySqlDatabaseConfigService],
  exports: [ConfigService, MySqlDatabaseConfigService],
})
export class MySqlDatabaseConfigModule {}

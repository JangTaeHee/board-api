import { NestFactory } from '@nestjs/core';
import { Logger, LoggerService, ValidationPipe } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const logger: LoggerService = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('board-api-server', {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: 'logs/info',
          filename: `%DATE%.all.log`,
          zippedArchive: true,
          maxFiles: 7,
        }),
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: 'logs/error',
          filename: `%DATE%.error.log`,
          zippedArchive: true,
          maxFiles: 7,
        }),
      ],
    }),
  });

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const appConfig: AppConfigService = app.get(AppConfigService);

  await app
    .listen(appConfig.port)
    .then(() =>
      logger.log(
        `--------------- [port: ${appConfig.port}] ${appConfig.name}  start!! ---------------`,
      ),
    );
}
bootstrap();

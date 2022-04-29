import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { AppConfigModule } from '@root/config/app/config.module';
import { MySqlDatabaseConfigModule } from './config/database/mysql/config.module';
import { BoardModule } from './models/board/board.module';
import { CommentsModule } from './models/comments/comments.module';
import { KeywordModule } from './models/keyword/keyword.module';
import { MysqlDBModule } from './providers/database/mysql/mysql.module';
import { MySqlDBService } from './providers/database/mysql/mysql.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [MysqlDBModule, MySqlDatabaseConfigModule],
      useClass: MySqlDBService,
      inject: [MySqlDBService],
    }),
    BoardModule,
    CommentsModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}

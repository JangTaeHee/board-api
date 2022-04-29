import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { KeywordModule } from '../keyword/keyword.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Board]), KeywordModule],
  controllers: [BoardController],
  providers: [Logger, BoardService],
  exports: [BoardService],
})
export class BoardModule {}

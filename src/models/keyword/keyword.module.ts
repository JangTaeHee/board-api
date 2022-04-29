import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { Keyword } from './entities/keyword.entity';
import { KeywordService } from './keyword.service';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Keyword])],
  providers: [Logger, KeywordService],
  exports: [KeywordService],
})
export class KeywordModule {}

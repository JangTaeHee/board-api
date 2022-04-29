import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@root/config/app/config.module';
import { KeywordModule } from '../keyword/keyword.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([Comment]),
    KeywordModule,
  ],
  controllers: [CommentsController],
  providers: [Logger, CommentsService],
})
export class CommentsModule {}

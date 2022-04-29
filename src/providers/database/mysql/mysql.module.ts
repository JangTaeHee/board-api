import { Module, Logger } from '@nestjs/common';
import { MySqlDatabaseConfigModule } from '@root/config/database/mysql/config.module';
import { MySqlDBService } from './mysql.service';

@Module({
  imports: [MySqlDatabaseConfigModule],
  providers: [Logger, MySqlDBService],
  exports: [],
})
export class MysqlDBModule {}

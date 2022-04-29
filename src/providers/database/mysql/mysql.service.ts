import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MySqlDatabaseConfigService } from '@root/config/database/mysql/config.service';

@Injectable()
export class MySqlDBService implements TypeOrmOptionsFactory {
  constructor(private configService: MySqlDatabaseConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.host,
      port: this.configService.port,
      username: this.configService.username,
      password: this.configService.password,
      database: this.configService.db,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

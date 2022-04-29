import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MySqlDatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('mysql_database.type');
  }

  get host(): string {
    return this.configService.get<string>('mysql_database.host');
  }

  get port(): number {
    return this.configService.get<number>('mysql_database.port');
  }

  get db(): string {
    return this.configService.get<string>('mysql_database.db');
  }

  get username(): string {
    return this.configService.get<string>('mysql_database.username');
  }

  get password(): string {
    return this.configService.get<string>('mysql_database.password');
  }
}

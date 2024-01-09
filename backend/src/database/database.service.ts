import * as postgres from 'postgres';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  sql: postgres.Sql;

  constructor(private readonly configService: ConfigService) {
    const connectUrl = configService.get<string>('DATABASE_URL', '');
    this.sql = postgres(connectUrl);
  }
}

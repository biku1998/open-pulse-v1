import * as postgres from 'postgres';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  sql: postgres.Sql;

  constructor(private readonly configService: ConfigService) {
    const connectUrl = configService.get<string>('DATABASE_URL', '');
    this.sql = postgres(connectUrl, {
      debug: (_, query, params) => {
        if (configService.get<string>('NODE_ENV') !== 'production') {
          console.log('query ::', query, '& params ::', params);
        }
      },
    });
  }
}

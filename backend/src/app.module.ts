import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';
import { LogsModule } from './logs/logs.module';
import { ProjectsModule } from './projects/projects.module';
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    HealthModule,
    HttpModule,
    DatabaseModule,
    LogsModule,
    ProjectsModule,
    InsightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

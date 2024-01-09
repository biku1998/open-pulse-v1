import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseHealthIndicator } from './database.health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  exports: [DatabaseHealthIndicator],
  providers: [DatabaseHealthIndicator],
})
export class HealthModule {}

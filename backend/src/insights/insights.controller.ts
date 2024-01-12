import { Body, Controller, Post } from '@nestjs/common';
import { CreateInsightDto } from './create-insight.dto';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Post()
  async createInsight(@Body() createInsightDto: CreateInsightDto) {
    await this.insightsService.createInsight(createInsightDto);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { convertSnakeCaseObjectToCamelCase } from 'src/lib/utils';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get(':id/data')
  async getChartData(@Param('id', ParseIntPipe) id: number) {
    const events = convertSnakeCaseObjectToCamelCase(
      await this.chartsService.getChartData(
        id,
        // TODO : replace hard coded user id
        '27b2d438-a2f7-4461-a6ad-781e4f43faf6',
      ),
    );

    return {
      data: events,
    };
  }
}

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
        '25f3f401-74f3-4f3a-a6ee-e3b9ae52ff41',
      ),
    );

    return {
      data: events,
    };
  }
}

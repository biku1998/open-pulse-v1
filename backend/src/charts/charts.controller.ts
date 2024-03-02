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
        'c6895ad8-0508-4b61-8fe1-5f7c105e3c6d',
      ),
    );

    return {
      data: events,
    };
  }
}

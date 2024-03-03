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
        'fcc518de-f5ba-4c95-b74e-13153c949229',
      ),
    );

    return {
      data: events,
    };
  }
}

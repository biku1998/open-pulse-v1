import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get(':id/data')
  async getChartData(@Param('id', ParseIntPipe) id: number) {
    return this.chartsService.getChartData(
      id,
      // TODO : replace hard coded user id
      '83e5ec13-e1e2-43a2-95e5-c91a3df8f72f',
    );
  }
}

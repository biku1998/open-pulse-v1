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
      'd56b82d2-fabc-44ba-953e-36b14fa40300',
    );
  }
}

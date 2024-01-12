import { Body, Controller, Post } from '@nestjs/common';
import { CreateLogDto } from './create-log.dto';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async createLog(@Body() createLogDto: CreateLogDto) {
    await this.logsService.createLog(createLogDto);
  }
}

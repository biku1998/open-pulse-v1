import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateLogDto } from './create-log.dto';
import { LogsService } from './logs.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Request } from 'src/types/express';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  async createLog(@Body() createLogDto: CreateLogDto, @Req() request: Request) {
    await this.logsService.createLog(createLogDto, request.token.createdBy);
  }
}

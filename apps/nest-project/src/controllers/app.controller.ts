import { Controller, Get, UseFilters } from '@nestjs/common';
import { ExceptionFilter } from 'apps/fx-app/src/filters/exception.filter';
import { AppService } from '../app.service';

@Controller()
@UseFilters(new ExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('date')
  getDate(): string {
    return this.appService.getCurrentDate();
  }
}

import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionFilter } from 'apps/fx-app/src/filters/exception.filter';

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

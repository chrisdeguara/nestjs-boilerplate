import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cached')
  @CacheTTL(30)
  getCachedItem(): string {
    return this.appService.getHello();
  }

  @Get('cached2')
  getCachedItem2(): string {
    return this.appService.getHello();
  }
}

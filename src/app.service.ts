import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {

  }
  
  getHello(): string {
    return "Hello world!";
  }

  getCurrentDate(): string {
    return moment().format('DD/MM/YYYY HH:mm:ss')
  }

  getConfigExample(): string {
    return this.configService.get<string>('cache.redis.url');
  }
}

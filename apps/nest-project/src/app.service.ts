import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return "Hello World!";
  }

  getCurrentDate(): string {
    return moment().format('DD/MM/YYYY HH:mm:ss')
  }
}

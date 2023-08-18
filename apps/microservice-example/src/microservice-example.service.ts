import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceExampleService {
  getHello(): string {
    return 'Hello World!';
  }
}

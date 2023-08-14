import { Injectable } from '@nestjs/common';

@Injectable()
export class FxAppService {
  getHello(): string {
    return 'Hello World!';
  }
}

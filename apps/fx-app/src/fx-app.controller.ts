import { Controller, Get } from '@nestjs/common';
import { FxAppService } from './fx-app.service';

@Controller()
export class FxAppController {
  constructor(private readonly fxAppService: FxAppService) {}

  @Get()
  getHello(): string {
    return this.fxAppService.getHello();
  }
}

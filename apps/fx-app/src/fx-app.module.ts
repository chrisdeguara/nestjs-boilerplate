import { Module } from '@nestjs/common';
import { FxAppController } from './fx-app.controller';
import { FxAppService } from './fx-app.service';

@Module({
  imports: [],
  controllers: [FxAppController],
  providers: [FxAppService],
})
export class FxAppModule {}

import { NestFactory } from '@nestjs/core';
import { FxAppModule } from './fx-app.module';

async function bootstrap() {
  const app = await NestFactory.create(FxAppModule);
  await app.listen(3000);
}
bootstrap();

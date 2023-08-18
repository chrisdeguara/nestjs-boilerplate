import { NestFactory } from '@nestjs/core';
import { FxAppModule } from './fx-app.module';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { createLoggerConfig } from '@app/custom-logger/custom-logger-config';

async function bootstrap() {
  const app = await NestFactory.create(FxAppModule);
  const configService = app.get(ConfigService);

  const loggerConfig = createLoggerConfig(configService);
  const logger = WinstonModule.createLogger(loggerConfig);
  
  app.useLogger(logger);
  
  await app.listen(configService.get('webserver.listen.port'));
}
bootstrap();

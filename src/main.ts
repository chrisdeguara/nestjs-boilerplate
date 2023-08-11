import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './modules/logger/logger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);

  const loggerConfig = createLoggerConfig(configService);
  const logger = WinstonModule.createLogger(loggerConfig);
  
  app.useLogger(logger);
  
  await app.listen(configService.get('webserver.listen.port'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { CalculatorAppModule } from './calculator-app.module';
import { ConfigService } from '@nestjs/config';
import { createLoggerConfig } from '@app/custom-logger/custom-logger-config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(CalculatorAppModule);
  
  const configService = app.get(ConfigService);

  const loggerConfig = createLoggerConfig(configService);
  const logger = WinstonModule.createLogger(loggerConfig);
  
  app.useLogger(logger);
  
  await app.listen(configService.get('webserver.listen.port'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { UserManagementModule } from './user-management.module';
import { ConfigService } from '@nestjs/config';
import { createLoggerConfig } from '@app/custom-logger/custom-logger-config';
import { WinstonModule } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserManagementModule);
  const configService = app.get(ConfigService);

  const loggerConfig = createLoggerConfig(configService);
  const logger = WinstonModule.createLogger(loggerConfig);
  
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  await app.listen(configService.get('webserver.listen.port'));
}
bootstrap();

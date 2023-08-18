import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MicroserviceExampleModule } from './microservice-example.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from '@app/custom-logger/custom-logger-config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroserviceExampleModule,
    {
      transport: Transport.TCP,
      options: {
        port: 50001
      }
    },
  );
  
  const configService = app.get(ConfigService);

  const loggerConfig = createLoggerConfig(configService);
  const logger = WinstonModule.createLogger(loggerConfig);
  
  app.useLogger(logger);

  await app.listen();  
}

bootstrap();
import { Module } from '@nestjs/common';
import { MicroserviceExampleController } from './microservice-example.controller';
import { MicroserviceExampleService } from './microservice-example.service';
import { CustomLoggerModule } from '@app/custom-logger';

@Module({
  imports: [CustomLoggerModule],
  controllers: [MicroserviceExampleController],
  providers: [MicroserviceExampleService],
})
export class MicroserviceExampleModule {}

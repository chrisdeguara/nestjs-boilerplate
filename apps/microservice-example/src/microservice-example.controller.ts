import { Controller, Get } from '@nestjs/common';
import { MicroserviceExampleService } from './microservice-example.service';

@Controller()
export class MicroserviceExampleController {
  constructor(private readonly microserviceExampleService: MicroserviceExampleService) {}

  @Get()
  getHello(): string {
    return this.microserviceExampleService.getHello();
  }
}

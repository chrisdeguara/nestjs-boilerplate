import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceExampleController } from './microservice-example.controller';
import { MicroserviceExampleService } from './microservice-example.service';

describe('MicroserviceExampleController', () => {
  let microserviceExampleController: MicroserviceExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroserviceExampleController],
      providers: [MicroserviceExampleService],
    }).compile();

    microserviceExampleController = app.get<MicroserviceExampleController>(MicroserviceExampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(microserviceExampleController.getHello()).toBe('Hello World!');
    });
  });
});

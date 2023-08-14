import { Test, TestingModule } from '@nestjs/testing';
import { FxAppController } from './fx-app.controller';
import { FxAppService } from './fx-app.service';

describe('FxAppController', () => {
  let fxAppController: FxAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FxAppController],
      providers: [FxAppService],
    }).compile();

    fxAppController = app.get<FxAppController>(FxAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fxAppController.getHello()).toBe('Hello World!');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorAppController } from './calculator-app.controller';
import { CalculatorModule } from '@app/calculator';
import { CacheModule } from '@nestjs/cache-manager';

describe('CalculatorAppController', () => {
  let calculatorAppController: CalculatorAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CalculatorModule,
        CacheModule.register()],
      controllers: [CalculatorAppController],
      providers: [],
    }).compile();

    calculatorAppController = app.get<CalculatorAppController>(CalculatorAppController);
  });

  describe('addition', () => {
    it('should add using query params', () => {
      const result = calculatorAppController.addUsingQueryParams(5, 3);
      expect(result).toBe(8);
    });

    it('should add using route params', () => {
      const result = calculatorAppController.addUsingRouteParams(5, 3);
      expect(result).toBe(8);
    });
  });

  describe('subtraction', () => {
    it('should subtract using query params', () => {
      const result = calculatorAppController.subtractUsingQueryParams(8, 3);
      expect(result).toBe(5);
    });

    it('should subtract using route params', () => {
      const result = calculatorAppController.subtractUsingRouteParams(8, 3);
      expect(result).toBe(5);
    });
  });

  // Similar tests for multiplication and division
  describe('multiplication', () => {
    it('should multiply using query params', () => {
      const result = calculatorAppController.multiplyUsingQueryParams(4, 3);
      expect(result).toBe(12);
    });

    it('should multiply using route params', () => {
      const result = calculatorAppController.multiplyUsingRouteParams(4, 3);
      expect(result).toBe(12);
    });
  });

  describe('division', () => {
    it('should divide using query params', () => {
      const result = calculatorAppController.divideUsingQueryParams(15, 3);
      expect(result).toBe(5);
    });

    it('should divide using route params', () => {
      const result = calculatorAppController.divideUsingRouteParams(15, 3);
      expect(result).toBe(5);
    });
  });
});

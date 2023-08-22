import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add', () => {
    it('should return the sum of numbers', () => {
      expect(service.add(0, 0)).toBe(0);
      expect(service.add(0, 1)).toBe(1);
      expect(service.add(1, 0)).toBe(1);
      expect(service.add(1, 2)).toBe(3);
      expect(service.add(-1, 5)).toBe(4);
      expect(service.add(101, 99)).toBe(200);
    });
  });

  describe('subtract', () => {
    it('should return the result of subtracting numbers', () => {
      expect(service.subtract(10, 5)).toBe(5);
      expect(service.subtract(0, 0)).toBe(0);
      expect(service.subtract(0, 1)).toBe(-1);
      expect(service.subtract(1, 0)).toBe(1);
      expect(service.subtract(-1, -5)).toBe(4);
    });
  });

  describe('multiply', () => {
    it('should return the product of numbers', () => {
      expect(service.multiply(2, 3)).toBe(6);
      expect(service.multiply(5, 2)).toBe(10);
      expect(service.multiply(10000, 0)).toBe(0);
      expect(service.multiply(0, 2322)).toBe(0);
      expect(service.multiply(0, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should return the result of dividing numbers', () => {
      expect(service.divide(10, 2)).toBe(5);
      expect(service.divide(20, 4)).toBe(5);
      expect(service.divide(0, 5)).toBe(0);
      expect(service.divide(20, 0)).toBe(Infinity);
    });
  });
});

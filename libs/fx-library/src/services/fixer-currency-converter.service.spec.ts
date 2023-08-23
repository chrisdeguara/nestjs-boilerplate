import { Test, TestingModule } from '@nestjs/testing';
import { FixerCurrencyConverterService } from './fixer-currency-converter.service';
import { ICurrencyConverterService } from '../interfaces/currency-converter-service.interface';

describe('FixerCurrencyConverterService', () => {
  let service: ICurrencyConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixerCurrencyConverterService],
    }).compile();

    service = module.get<ICurrencyConverterService>(FixerCurrencyConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

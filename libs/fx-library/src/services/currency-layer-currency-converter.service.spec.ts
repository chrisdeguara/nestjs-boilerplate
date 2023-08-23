import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyLayerCurrencyConverterService } from './currency-layer-currency-converter.service';
import { ICurrencyConverterService } from '../interfaces/currency-converter-service.interface';

describe('CurrencyLayerCurrencyConverterService', () => {
  let service: ICurrencyConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyLayerCurrencyConverterService],
    }).compile();

    service = module.get<ICurrencyConverterService>(CurrencyLayerCurrencyConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

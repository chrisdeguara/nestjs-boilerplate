import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyLayerCurrencyConverterService } from './currency-layer-currency-converter.service';

describe('CurrencyLayerCurrencyConverterService', () => {
  let service: CurrencyLayerCurrencyConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyLayerCurrencyConverterService],
    }).compile();

    service = module.get<CurrencyLayerCurrencyConverterService>(CurrencyLayerCurrencyConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

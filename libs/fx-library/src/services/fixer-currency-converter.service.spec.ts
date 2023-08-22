import { Test, TestingModule } from '@nestjs/testing';
import { FixerCurrencyConverterService } from './fixer-currency-converter.service';

describe('FixerCurrencyConverterService', () => {
  let service: FixerCurrencyConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixerCurrencyConverterService],
    }).compile();

    service = module.get<FixerCurrencyConverterService>(FixerCurrencyConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

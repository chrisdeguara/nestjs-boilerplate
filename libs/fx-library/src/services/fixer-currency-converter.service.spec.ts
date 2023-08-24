import { ICurrencyConverterService } from '../interfaces/currency-converter-service.interface';
import { TestBed } from '@automock/jest';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CurrencyPairDto } from '../dto/currency-pair.dto';
import { CurrencyPairExchangeRateDto } from '../dto/currency-pair-exchange-rate.dto';
import { of } from 'rxjs';
import { FixerCurrencyConverterService } from './fixer-currency-converter.service';

describe('FixerCurrencyConverterService', () => {
  let underTest: ICurrencyConverterService;
  let configService: jest.Mocked<ConfigService>;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(async () => {
    const {unit, unitRef } = TestBed.create(FixerCurrencyConverterService).compile()

    underTest = unit;

    configService = unitRef.get(ConfigService)
    httpService = unitRef.get(HttpService);
  })

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  it('should return exchange rate', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('EUR', 'USD');
    const exchangeRate = 1.23;

    httpService.get = jest.fn().mockReturnValue(
      of({
        data: {
          success: true,
          rates: {
            USD: exchangeRate,
          },
        },
      }),
    );

    const result: CurrencyPairExchangeRateDto = await underTest.getExchangeRate(
      currencyPair,
    );

    expect(result.exchangeRate).toBe(exchangeRate);
  });

  it('should throw BadRequestException for unsuccessful API response', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('EUR', 'USD');

    httpService.get = jest.fn().mockReturnValue(
      of({
        data: {
          success: false,
          error: {
            code: 123,
          },
        },
      }),
    );

    await expect(underTest.getExchangeRate(currencyPair)).rejects.toThrowError(
      BadRequestException,
    );
  });


  it('should return exchange rate of 1 when base and quote currency are the same', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('EUR', 'EUR');
    const exchangeRate = 1;

    
    const result: CurrencyPairExchangeRateDto = await underTest.getExchangeRate(
      currencyPair,
    );

    await expect(result.exchangeRate).toBe(exchangeRate);
  });


  it('should throw NotAcceptableException when base currency is not EUR', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('USD', 'EUR');

    await expect(underTest.getExchangeRate(currencyPair)).rejects.toThrowError(
      NotAcceptableException
    );
  });
});

import { CurrencyLayerCurrencyConverterService } from './currency-layer-currency-converter.service';
import { ICurrencyConverterService } from '../interfaces/currency-converter-service.interface';
import { TestBed } from '@automock/jest';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ForbiddenException, HttpServer } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CurrencyPairDto } from '../dto/currency-pair.dto';
import { CurrencyPairExchangeRateDto } from '../dto/currency-pair-exchange-rate.dto';
import { of } from 'rxjs';

describe('CurrencyLayerCurrencyConverterService', () => {
  let underTest: ICurrencyConverterService;
  let configService: jest.Mocked<ConfigService>;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    const {unit, unitRef } = TestBed.create(CurrencyLayerCurrencyConverterService).compile();

    underTest = unit;

    configService = unitRef.get(ConfigService)
    httpService = unitRef.get(HttpService);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  it('should return exchange rate', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('USD', 'EUR');
    const exchangeRate = 0.9;

    httpService.get = jest.fn().mockReturnValue(
      of({
        data: {
          success: true,
          quotes: {
            'USDEUR': exchangeRate,
          },
        },
      }),
    );

    const result: CurrencyPairExchangeRateDto = await underTest.getExchangeRate(
      currencyPair,
    );

    await expect(result.exchangeRate).toBe(exchangeRate);
  });

  it('should throw BadRequestException for unsuccessful API response', async () => {
    const currencyPair: CurrencyPairDto = new CurrencyPairDto('USD', 'EUR');

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
});

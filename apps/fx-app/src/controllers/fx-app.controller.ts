import { BadRequestException, Controller, ForbiddenException, Get, HttpException, Inject, InternalServerErrorException, Param, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { CurrencyPairExchangeRateDto } from '@app/fx-library/dto/currency-pair-exchange-rate.dto';
import { CurrencyPairDto } from '@app/fx-library/dto/currency-pair.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExceptionFilter } from '../filters/exception.filter';
import { ICurrencyConverterService } from '@app/fx-library/interfaces/currency-converter-service.interface';
import { CURRENCY_LAYER_CURRENCY_CONVERTER_SERVICE, FIXER_CURRENCY_CONVERTER_SERVICE } from '@app/fx-library/constants';

@Controller('fx')
@UseFilters(new ExceptionFilter)
@UseInterceptors(CacheInterceptor)
export class FxAppController {
  constructor(
   @Inject(CURRENCY_LAYER_CURRENCY_CONVERTER_SERVICE) private readonly currencyConverterService: ICurrencyConverterService,
   @Inject(FIXER_CURRENCY_CONVERTER_SERVICE) private readonly freeCurrency: ICurrencyConverterService) {}


  @Get(':baseCurrency/:quoteCurrency')
  async getExchangeRateUsingRouteParams(@Param() params: CurrencyPairDto) : Promise<CurrencyPairExchangeRateDto> {

    try {
      const { baseCurrency: sourceCurrency, quoteCurrency: targetCurrency} = params;
      const currencyPair = new CurrencyPairDto(sourceCurrency, targetCurrency)
      return await this.currencyConverterService.getExchangeRate(currencyPair);
    } catch (error) {
      throw new BadRequestException('An error has occured while resolving the exchange rate')
    }
  }

  @Get()
  async getExchangeRateUsingQueryParams(@Query() query: CurrencyPairDto): Promise<CurrencyPairExchangeRateDto> {
    try {
      const { baseCurrency: sourceCurrency, quoteCurrency: targetCurrency } = query;
      const currencyPair = new CurrencyPairDto(sourceCurrency, targetCurrency)
      return await this.freeCurrency.getExchangeRate(currencyPair);
    } catch (error) {
      throw new BadRequestException('An error has occurred while resolving the exchange rate');
    }
  }
}

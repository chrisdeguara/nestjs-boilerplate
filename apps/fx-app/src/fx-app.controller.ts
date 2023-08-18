import { BadRequestException, Controller, ForbiddenException, Get, HttpException, InternalServerErrorException, Param, Query, UseFilters } from '@nestjs/common';
import { CurrencyPairExchangeRateDto } from '@app/fx-library/dto/currency-pair-exchange-rate.dto';
import { CurrencyConverterService } from '@app/fx-library';
import { CurrencyPairDto } from '@app/fx-library/dto/currency-pair.dto';
import { ExceptionFilter } from './filters/exception.filter';

@Controller('fx')
@UseFilters(new ExceptionFilter)
export class FxAppController {
  constructor(
    private readonly currencyConverterService: CurrencyConverterService) {}


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
      return await this.currencyConverterService.getExchangeRate(currencyPair);
    } catch (error) {
      throw new BadRequestException('An error has occurred while resolving the exchange rate');
    }
  }
}

import { Controller, Get, InternalServerErrorException, Param, Query } from '@nestjs/common';
import { CurrencyPairExchangeRateDto } from '@app/fx-library/dto/currency-pair-exchange-rate.dto';
import { CurrencyConverterService } from '@app/fx-library';
import { CurrencyPairDto } from '@app/fx-library/dto/currency-pair.dto';

@Controller()
export class FxAppController {
  constructor(
    private readonly currencyConverterService: CurrencyConverterService) {}


  @Get(':sourceCurrency/:targetCurrency')
  async getExchangeRateUsingRouteParams(@Param() params: CurrencyPairDto) : Promise<CurrencyPairExchangeRateDto> {

    try {
      const { sourceCurrency, targetCurrency} = params;
      const currencyPair = { sourceCurrency, targetCurrency };
      return this.currencyConverterService.getExchangeRate(currencyPair);
    } catch (error) {
      throw new InternalServerErrorException('An error has occured while resolving the exchange rate')
    }
  }

  @Get()
  async getExchangeRateUsingQueryParams(@Query() query: CurrencyPairDto): Promise<CurrencyPairExchangeRateDto> {
    try {
      const { sourceCurrency, targetCurrency } = query;
      const currencyPair = { sourceCurrency, targetCurrency };
      return this.currencyConverterService.getExchangeRate(currencyPair);
    } catch (error) {
      throw new InternalServerErrorException('An error has occurred while resolving the exchange rate');
    }
  }
}

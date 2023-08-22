import { CurrencyPairExchangeRateDto } from "../dto/currency-pair-exchange-rate.dto";
import { CurrencyPairDto } from "../dto/currency-pair.dto";

export interface ICurrencyConverterService {
    getExchangeRate(currencyPair: CurrencyPairDto): Promise<CurrencyPairExchangeRateDto> 
}
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CurrencyPairExchangeRateDto } from '../dto/currency-pair-exchange-rate.dto';
import { CurrencyPairDto } from '../dto/currency-pair.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyConverterService {
    
    private readonly logger = new Logger(CurrencyConverterService.name);
    
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService) {

    }

    public async getExchangeRate(currencyPair: CurrencyPairDto): Promise<CurrencyPairExchangeRateDto> {

        this.logger.log(`Getting exchange rate for currency pair: ${currencyPair}`)

        currencyPair.sanitizeBaseCurrency();
        currencyPair.sanitizeQuoteCurrency();

        if (currencyPair.baseCurrency === currencyPair.quoteCurrency) {
            return new CurrencyPairExchangeRateDto(1);
        }

        const url = `${this.configService.get('currencylayer.api.baseUrl')}/api/live?access_key=${this.configService.get('currencylayer.api.key')}&source=${currencyPair.baseCurrency}&currencies=${currencyPair.quoteCurrency}`;


        const response  = await firstValueFrom(this.httpService.get(url)
            .pipe(
                catchError((error: AxiosError) => {
                    // Log the error
                    throw error
                }),
            )
        );

        if (!response.data.success) {
            throw new ForbiddenException(`FX API could not process request. Error Code: ${response.data.error.code}`)
        }

        const exchangeRate = Number(Object.values(response.data.quotes)[0]);
        const exchangeRateDto = new CurrencyPairExchangeRateDto(exchangeRate);

        this.logger.log(`Exchange rate for currency pair: ${currencyPair} is ${exchangeRateDto}`)

        return exchangeRateDto;
    }
}

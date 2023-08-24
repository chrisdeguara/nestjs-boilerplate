import { BadRequestException, Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { ICurrencyConverterService } from '../interfaces/currency-converter-service.interface';
import { CurrencyPairExchangeRateDto } from '../dto/currency-pair-exchange-rate.dto';
import { CurrencyPairDto } from '../dto/currency-pair.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class FixerCurrencyConverterService implements ICurrencyConverterService {
    private readonly logger = new Logger(FixerCurrencyConverterService.name);
    
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService) {

    }

    public async getExchangeRate(currencyPair: CurrencyPairDto): Promise<CurrencyPairExchangeRateDto> {

        this.logger.log(`Getting exchange rate for currency pair: ${currencyPair} from fixer`)

        currencyPair.sanitizeBaseCurrency();
        currencyPair.sanitizeQuoteCurrency();


        if (currencyPair.baseCurrency !== 'EUR') {
            throw new NotAcceptableException('Only EUR is supported as base currency')
        }

        if (currencyPair.baseCurrency === currencyPair.quoteCurrency) {
            return new CurrencyPairExchangeRateDto(1);
        }

        const url = `${this.configService.get('fixer.api.baseUrl')}/api/latest?access_key=${this.configService.get('fixer.api.key')}&symbols=${currencyPair.baseCurrency},${currencyPair.quoteCurrency}`;

        const response  = await firstValueFrom(this.httpService.get(url)
            .pipe(
                catchError((error: AxiosError) => {
                    this.logger.error('Failed to get exchange rate from API', error);
                    throw error
                }),
            )
        );

        if (!response.data.success) {
            throw new BadRequestException(`FX API could not process request. Error Code: ${response.data.error.code}`)
        }

        const exchangeRate = Number(response.data.rates[currencyPair.quoteCurrency]);
        const exchangeRateDto = new CurrencyPairExchangeRateDto(exchangeRate);

        this.logger.log(`Exchange rate for currency pair: ${currencyPair} is ${exchangeRateDto}`)

        return exchangeRateDto;
    }
}

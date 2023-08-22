import { Module } from '@nestjs/common';
import { CurrencyLayerCurrencyConverterService } from './services/currency-layer-currency-converter.service';
import { HttpModule } from '@nestjs/axios';
import { CURRENCY_LAYER_CURRENCY_CONVERTER_SERVICE, FIXER_CURRENCY_CONVERTER_SERVICE } from './constants';
import { FixerCurrencyConverterService } from './services/fixer-currency-converter.service';

const currencyLayerCurrencyConverterService = {
  provide: CURRENCY_LAYER_CURRENCY_CONVERTER_SERVICE,
  useClass: CurrencyLayerCurrencyConverterService
}

const fixerCurrencyConverterService = {
  provide: FIXER_CURRENCY_CONVERTER_SERVICE,
  useClass: FixerCurrencyConverterService
}

@Module({
  imports: [HttpModule],
  providers: [
    currencyLayerCurrencyConverterService,
    fixerCurrencyConverterService
  ],
  exports: [
    currencyLayerCurrencyConverterService,
    fixerCurrencyConverterService
  ],
})
export class FxLibraryModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { FxAppController } from './fx-app.controller';
import { CurrencyPairDto } from '@app/fx-library/dto/currency-pair.dto';
import { ConfigModule } from '@nestjs/config';
import currencyLayerConfig from './config/currency-layer.config';
import loggerConfig from './config/logger.config';
import webserverConfig from './config/webserver.config';
import configuration from './config/configuration';
import { CurrencyConverterService, FxLibraryModule } from '@app/fx-library';
import { HttpModule } from '@nestjs/axios';

describe('FxAppController', () => {
  let fxAppController: FxAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.dev.local', 'env.dev'],
          ignoreEnvFile: false,
          load: [configuration, webserverConfig, loggerConfig, currencyLayerConfig],
        }),
        HttpModule,
        FxLibraryModule
      ],
      controllers: [FxAppController],
      providers: [],
    }).compile();

    fxAppController = app.get<FxAppController>(FxAppController);
  });

  describe('root', () => {
    it('should return a number', () => {
      const query: CurrencyPairDto = {
        sourceCurrency: 'EUR',
        targetCurrency: 'USD'
      }
      const result = fxAppController.getExchangeRateUsingQueryParams(query);
      expect(typeof result).toBe('number');
    });
  });
});

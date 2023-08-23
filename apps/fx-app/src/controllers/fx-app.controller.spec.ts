import { Test, TestingModule } from '@nestjs/testing';
import { FxAppController } from './fx-app.controller';
import { CurrencyPairDto } from '@app/fx-library/dto/currency-pair.dto';
import { FxLibraryModule } from '@app/fx-library';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import currencyLayerConfig from '../config/currency-layer.config';
import { ConfigModule } from '@nestjs/config';

describe('FxAppController', () => {
  let fxAppController: FxAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.dev.local', 'env.dev'],
          ignoreEnvFile: false,
          load: [currencyLayerConfig]
        }),
        CacheModule.register(),
        HttpModule,
        FxLibraryModule
      ],
      controllers: [FxAppController],
      providers: [],
    }).compile();

    fxAppController = app.get<FxAppController>(FxAppController);
  });

  describe('getExchangeRateUsingRouteParams', () => {
    it('should return a CurrencyPairExchangeRateDto object', async () => {
      const query = new CurrencyPairDto('USD', 'EUR');
      const result = await fxAppController.getExchangeRateUsingRouteParams(query);
      expect(result).toBeDefined();
      expect(result.constructor.name).toBe('CurrencyPairExchangeRateDto');
    });
  });

  describe('getExchangeRateUsingQueryParams', () => {
    it('should return a CurrencyPairExchangeRateDto object', async () => {
      const query = new CurrencyPairDto('USD', 'EUR');
      const result = await fxAppController.getExchangeRateUsingQueryParams(query);
      expect(result).toBeDefined();
      expect(result.constructor.name).toBe('CurrencyPairExchangeRateDto');
    });
  });
});

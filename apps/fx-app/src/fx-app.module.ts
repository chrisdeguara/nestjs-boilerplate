import { Module } from '@nestjs/common';
import { FxAppController } from './fx-app.controller';
import { FxLibraryModule } from '@app/fx-library';
import { ConfigModule } from '@nestjs/config';
import loggerConfig from './config/logger.config';
import webserverConfig from './config/webserver.config';
import configuration from './config/configuration';
import currencyLayerConfig from './config/currency-layer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [configuration, webserverConfig, loggerConfig, currencyLayerConfig]
    }),
    FxLibraryModule
  ],
  controllers: [FxAppController],
  providers: [],
})
export class FxAppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FxAppController } from './fx-app.controller';
import { FxLibraryModule } from '@app/fx-library';
import { ConfigModule } from '@nestjs/config';
import webserverConfig from './config/webserver.config';
import currencyLayerConfig from './config/currency-layer.config';
import { CustomLoggerModule } from '@app/custom-logger';
import { RequestLoggerMiddleware } from '@app/custom-logger/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [webserverConfig, currencyLayerConfig]
    }),
    FxLibraryModule,
    CustomLoggerModule
  ],
  controllers: [FxAppController],
  providers: [],
})
export class FxAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

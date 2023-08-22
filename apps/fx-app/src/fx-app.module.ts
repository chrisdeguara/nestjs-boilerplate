import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FxLibraryModule } from '@app/fx-library';
import { ConfigModule } from '@nestjs/config';
import webserverConfig from './config/webserver.config';
import currencyLayerConfig from './config/currency-layer.config';
import { CustomLoggerModule } from '@app/custom-logger';
import { RequestLoggerMiddleware } from '@app/custom-logger/middleware/request-logger.middleware';
import { RedisCacheModule } from '@app/redis-cache';
import { FxAppController } from './controllers/fx-app.controller';
import fixerConfig from './config/fixer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [webserverConfig, currencyLayerConfig, fixerConfig]
    }),
    FxLibraryModule,
    CustomLoggerModule,
    RedisCacheModule
  ],
  controllers: [FxAppController]
})
export class FxAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

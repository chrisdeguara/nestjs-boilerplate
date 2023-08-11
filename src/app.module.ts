import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheConfigService } from './cache/cache-config.service';
import configuration from './configuration';
import cacheConfig from './cache/cache.config';
import webserverConfig from './webserver/webserver.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [configuration, webserverConfig, cacheConfig]
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService
  ],
})
export class AppModule { }

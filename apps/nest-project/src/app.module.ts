import { CacheConfigModule } from './modules/cache-config/cache-config.module';
import { ScheduledTasksModule } from './modules/scheduled-tasks/scheduled-tasks.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheConfigService } from './modules/cache-config/cache-config.service';
import configuration from './config/configuration';
import cacheConfig from './config/cache.config';
import webserverConfig from './config/webserver.config';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestLoggerMiddleware } from '../../../libs/custom-logger/src/middleware/request-logger.middleware';
import { CustomLoggerModule } from '@app/custom-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [configuration, webserverConfig, cacheConfig]
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
    ScheduledTasksModule,
    CustomLoggerModule,
    CacheConfigModule
  ],
  controllers: [AppController],
  providers: [{
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService
  ],
  exports: [
    ConfigModule,
    CacheModule,
    CacheConfigModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

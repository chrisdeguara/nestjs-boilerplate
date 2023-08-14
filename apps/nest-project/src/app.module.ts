import { LoggerModule } from './modules/logger/logger.module';
import { ScheduledTasksModule } from './modules/scheduled-tasks/scheduled-tasks.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheConfigService } from './cache/cache-config.service';
import configuration from './config/configuration';
import cacheConfig from './config/cache.config';
import webserverConfig from './config/webserver.config';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestLoggerMiddleware } from './modules/logger/middleware/request-logger.middleware';
import loggerConfig from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [configuration, webserverConfig, loggerConfig, cacheConfig]
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
    ScheduledTasksModule,
    LoggerModule,
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
export class AppModule { 
   configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

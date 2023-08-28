import { UserManagementModule } from './../../user-management/src/user-management.module';
import { UsersModule } from './../../user-management/src/users/users.module';
import { UsersModule } from './../../user-management/src/users.module';
import { ScheduledTasksModule } from './modules/scheduled-tasks/scheduled-tasks.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import configuration from './config/configuration';
import webserverConfig from './config/webserver.config';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestLoggerMiddleware } from '../../../libs/custom-logger/src/middleware/request-logger.middleware';
import { CustomLoggerModule } from '@app/custom-logger';
import { RedisCacheModule } from '@app/redis-cache';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    UserManagementModule,
    UsersModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [configuration, webserverConfig]
    }),
    ScheduleModule.forRoot(),
    ScheduledTasksModule,
    CustomLoggerModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  },
    AppService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

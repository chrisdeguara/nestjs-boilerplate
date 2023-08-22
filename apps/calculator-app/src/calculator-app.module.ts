import { Module } from '@nestjs/common';
import { CalculatorAppController } from './calculator-app.controller';
import { CalculatorAppService } from './calculator-app.service';
import { CalculatorModule } from '@app/calculator';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from '@app/custom-logger';
import { RedisCacheModule } from '@app/redis-cache';
import webserverConfig from './config/webserver.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [webserverConfig]
    }),
    CalculatorModule,
    CustomLoggerModule,
    RedisCacheModule],
  controllers: [CalculatorAppController],
  providers: [CalculatorAppService],
})
export class CalculatorAppModule {}

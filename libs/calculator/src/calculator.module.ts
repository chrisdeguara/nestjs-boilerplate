import { Module } from '@nestjs/common';
import { CalculatorService } from './services/calculator.service';
import { CALCULATOR_SERVICE } from './interfaces/calculator-service.interface';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from '@app/custom-logger';

const calculatorService = {
  provide: CALCULATOR_SERVICE,
  useClass: CalculatorService
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false
    }),
    CustomLoggerModule
  ],
  providers: [
    calculatorService
  ],
  exports: [
    calculatorService
  ],
})
export class CalculatorModule {}

import { CalculatorService } from '@app/calculator';
import { Injectable, Logger } from '@nestjs/common';
import { ICalculatorAppService } from './calculator-app-service.interface';

@Injectable()
export class CalculatorAppService implements ICalculatorAppService {
  private readonly logger = new Logger(CalculatorAppService.name);

  constructor(
    private readonly calculatorService: CalculatorService
  ) {}

  public add(num1: number, num2: number): number {
    const result = this.calculatorService.add(num1, num2);
    this.logger.log(`${num1} + ${num2} = ${result}`);
    return result;
  }

  public subtract(num1: number, num2: number): number {
    const result = this.calculatorService.subtract(num1, num2);
    this.logger.log(`${num1} - ${num2} = ${result}`);
    return result;
  }

  public multiply(num1: number, num2: number): number {
    const result = this.calculatorService.multiply(num1, num2);
    this.logger.log(`${num1} * ${num2} = ${result}`);
    return result;
  }

  public divide(num1: number, num2: number): number {
    const result = this.calculatorService.divide(num1, num2);
    this.logger.log(`${num1} / ${num2} = ${result}`);
    return result;
  }
}

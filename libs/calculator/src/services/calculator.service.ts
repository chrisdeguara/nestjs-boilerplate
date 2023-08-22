import { Injectable, Logger } from '@nestjs/common';
import { ICalculatorService } from '../interfaces/calculator-service.interface';

@Injectable()
export class CalculatorService implements ICalculatorService {
    
    private readonly logger = new Logger(CalculatorService.name);

    public add(num1: number, num2: number): number {
        const result = num1 + num2;
        this.logger.log(`${num1} + ${num2} = ${result}`);
        return result;
      }
    
      public subtract(num1: number, num2: number): number {
        const result = num1 - num2;
        this.logger.log(`${num1} - ${num2} = ${result}`);
        return result;
      }
    
      public multiply(num1: number, num2: number): number {
        const result = num1 * num2;
        this.logger.log(`${num1} * ${num2} = ${result}`);
        return result;
      }
    
      public divide(num1: number, num2: number): number {
        const result = num1 / num2;
        this.logger.log(`${num1} / ${num2} = ${result}`);
        return result;
      }
}

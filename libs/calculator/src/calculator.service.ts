import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
    
    public add(num1: number, num2: number): number {
        return num1 + num2;
    }

    public subtract(num1: number, num2: number): number {
        return num1 - num2;
    }

    public multiply(num1: number, num2: number): number {
        return num1 * num2;
    }

    public divide(num1: number, num2: number): number {
        return num1 / num2;
    }
}

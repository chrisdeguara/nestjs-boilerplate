export const CALCULATOR_APP_SERVICE = 'CALCULATOR APP SERVICE'

export interface ICalculatorAppService {
    add(num1: number, num2: number): number;
    subtract(num1: number, num2: number): number;
    multiply(num1: number, num2: number): number;
    divide(num1: number, num2: number): number;
}
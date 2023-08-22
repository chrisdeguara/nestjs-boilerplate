import { Controller, Get, Inject, Param, ParseFloatPipe, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ICalculatorService } from '@app/calculator/interfaces/calculator-service.interface';
import { CALCULATOR_SERVICE } from 'libs/calculator/constants';

@Controller('calculator')
@UseInterceptors(CacheInterceptor)
export class CalculatorAppController {
  constructor(
    @Inject(CALCULATOR_SERVICE)
    private readonly calculatorService: ICalculatorService) {}

  @Get('add')
  addUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.add(num1, num2);
  }

  @Get('add/:num1/:num2')
  addUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.add(num1, num2);
  }

  
  @Get('subtract')
  subtractUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.subtract(num1, num2);
  }

  @Get('subtract/:num1/:num2')
  subtractUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.subtract(num1, num2);
  }

  
  @Get('multiply')
  multiplyUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.multiply(num1, num2);
  }

  @Get('multiply/:num1/:num2')
  multiplyUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.multiply(num1, num2);
  }


  @Get('divide')
  divideUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.divide(num1, num2);
  }

  @Get('divide/:num1/:num2')
  divideUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorService.divide(num1, num2);
  }
}

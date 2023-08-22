import { Controller, Get, Inject, Param, ParseFloatPipe, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CALCULATOR_APP_SERVICE, ICalculatorAppService } from './calculator-app-service.interface';

@Controller('calculator')
@UseInterceptors(CacheInterceptor)
export class CalculatorAppController {
  constructor(
    @Inject(CALCULATOR_APP_SERVICE)
    private readonly calculatorAppService: ICalculatorAppService) {}

  @Get('add')
  addUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.add(num1, num2);
  }

  @Get('add/:num1/:num2')
  addUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.add(num1, num2);
  }

  
  @Get('subtract')
  subtractUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.subtract(num1, num2);
  }

  @Get('subtract/:num1/:num2')
  subtractUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.subtract(num1, num2);
  }

  
  @Get('multiply')
  multiplyUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.multiply(num1, num2);
  }

  @Get('multiply/:num1/:num2')
  multiplyUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.multiply(num1, num2);
  }


  @Get('divide')
  divideUsingQueryParams(@Query('num1', ParseFloatPipe) num1: number, @Query('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.divide(num1, num2);
  }

  @Get('divide/:num1/:num2')
  divideUsingRouteParams(@Param('num1', ParseFloatPipe) num1: number, @Param('num2', ParseFloatPipe) num2: number): number {
    return this.calculatorAppService.divide(num1, num2);
  }
}

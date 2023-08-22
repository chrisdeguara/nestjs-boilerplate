import { Controller, Get, Param, ParseFloatPipe, Query, UseInterceptors } from '@nestjs/common';
import { CalculatorAppService } from './calculator-app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('calculator')
@UseInterceptors(CacheInterceptor)
export class CalculatorAppController {
  constructor(private readonly calculatorAppService: CalculatorAppService) {}

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

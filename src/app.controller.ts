import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MathFormulas } from './app.service';

@Controller('math')
export class AppController {
  constructor(private readonly mathFormulas : MathFormulas) {}

  @Post('quadratic')
  solveQuadratic( @Body('equation') equation:string ){
    return this.mathFormulas.quadraticFormula(equation);
  }

  @Post('integration')
  solveIntegration( @Body('equation') equation:string ){
    return this.mathFormulas.findIntegration(equation);
  }

  @Post('sdaviation')
  solveSdaviation( @Body('data') data:number[] ){
    return this.mathFormulas.standardDeviation(data);
  }

  @Post('inverse/2by2')
  inverse2by2( @Body('data') data:number[][] ){
    return this.mathFormulas.invertMatrix2by2(data);
  }

  @Post('inverse/3by3')
  inverse3by3( @Body('data') data:number[][] ){
    return this.mathFormulas.invertMatrix3by3(data);
  }
}

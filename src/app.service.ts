import { Injectable } from '@nestjs/common';

@Injectable()
export class MathFormulas {

  quadraticFormula(problem: string): { x1: null | number, x2: null | number } {

    problem = problem.replace(/\s/g, '');
    problem = problem.replace(/-/gi, "+-");
    let prob = problem.split('=');
    
    if (prob[1] !== "0") {
      let sign = prob[1] === '-' ? '+' : '-';
      prob[0] = prob[0] + sign + prob[1];
    }
    problem = prob[0];
    console.log(prob[0]);
  
    if (!problem.includes('x^2')) {
      throw new Error("Equation is not quadratic (missing x^2 term).It should be in format ax^2+bx+c=0 .");
    }

    let match = problem.match(/([+-]?\d*x\^2)|([+-]?\d*x)|([+-]?\d+)|([+-]?\(\d+\))/g) || [];

    console.log(match);
    if(match[3]){
      var x= (match[2]);
      let xsign = x === '-' ? '-' : '+';
      var y= match[3];
      let ysign = y === '-' ? '-' : '+';

      if(xsign === '+' && ysign === "+"){
        let xnum = parseInt(x);
        let ynum = parseInt(y);
        let value= xnum+ynum;
        match[2] = value.toString() ;
      }

      if(xsign === '-' && ysign === "-"){
        let xnum = parseInt(x);
        let ynum = parseInt(y);
        let value= xnum+ynum;
        match[2] = value.toString() ;
      }

      if(xsign === '+' && ysign === "-"){
        let xnum = parseInt(x);
        let ynum = parseInt(y);
        let value= xnum-ynum;
        match[2] = value.toString() ;
      }

      if(xsign === '+' && ysign === "-"){
        let xnum = parseInt(x);
        let ynum = parseInt(y);
        let value= ynum-xnum;
        match[2] = value.toString() ;
      }

    }
    match.splice(3);
    console.log(match);
    
  
    let a = 0, b = 0, c = 0;
    match.forEach(term => {
      if (term.includes('x^2')) {
        a = term === 'x^2' ? 1 : term === '-x^2' ? -1 : parseInt(term);
      } else if (term.includes('x')) {
        b = term === 'x' ? 1 : term === '-x' ? -1 : parseInt(term);
      } else {
        c = parseInt(term);
        console.log(c);
        
      }
    });

    if (a === 0) {
      throw new Error("Equation is not quadratic (missing x^2 term).");
    }

    let d = (b ** 2) - (4 * a * c);
    if (d < 0) {
      return { x1: null, x2: null }
    }
    let sqrt = Math.sqrt(d);
    let x1 = (-b + sqrt) / (2 * a);
    let x2 = (-b - sqrt) / (2 * a);
    return { x1, x2 };
  }
  findIntegration(problem: string): string {
    problem = problem.replace(/\s/g, '');
    problem = problem.replace(/-/gi, "+-");

    let terms = problem.match(/([+-]?\d*x\^[0-9])|([+-]?\d*x)|([+-]?\d+)/g) || [];

    var result = '';
    terms.forEach((term, index) => {

      let sign = term[0] === '-' ? '-' : '+';
      term = term.replace(/^[+-]/, '');

      if (term.includes('x')) {

        const match = term.match(/x(?:\^(-?\d+))?/) || [];
        console.log('match: ', match);

        var split = term.split('x');
        var a = parseInt(split[0]);
        var b = match[1] === undefined ? 2 : parseInt(match[1]) + 1;


        newTerm = (Number.isNaN(a)) ? `(x^${b}/${b})` : `${a} * (x^${b}/${b})`;
        var newTerm = (a % b === 0) ? `x^${b}` : `${a} * (x^${b}/${b})`;
        result += (index === 0 ? '' : ` ${sign} `) + newTerm;

      } else {
        a = parseInt(term);
        newTerm = (a === 1) ? 'x' : `${a}x`;
        result += (index === 0 ? '' : ` ${sign} `) + newTerm;

      }
      console.log(result);

    });
    return result + ' + c';
  }
  standardDeviation(data: number[]): number {

    if (data.length === 0) {
      return 0;
    }

    let sum = 0;
    data.forEach((value) => {
      sum += value;
    })

    let mean = sum / data.length;
    let differences = data.map(value => Math.pow(value - mean, 2));
    let variance = differences.reduce((sum, value) => sum + value, 0) / data.length;
    let result = Math.sqrt(variance);

    return result;
  }
  invertMatrix2by2(matrix: number[][]): number[][] | null {

    if (matrix.length !== 2 || matrix[0].length !== 2) {
      throw new Error("Only 2x2 matrices are applicable.")
    }

    let [[a, b], [c, d]] = matrix;
    let determinant = a * d - b * c;
    if (determinant === 0) return null;

    let inverse = [
      [d / determinant, -b / determinant],
      [-c / determinant, a / determinant]
    ];

    return inverse;
  }
  invertMatrix3by3(A: number[][]) : number[][] | null {

    if(A.length !== 3 && A[0].length !== 3 ){
      throw new Error("Only 3X3 matrices are applicable.");
    }

    let detA1 = (A[1][1] * A[2][2] - A[1][2] * A[2][1]);
    let detA2 =  (A[1][0] * A[2][2] - A[1][2] * A[2][0]);
    let detA3 = (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
    let detA= (A[0][0] * detA1) - (A[0][1] * detA2) + (A[0][2] * detA3) ;

    if (detA === 0) return null; 

    let C = [
        [
          detA1,
          -detA2, 
          detA3
        ],
        [
          -(A[0][1] * A[2][2] - A[0][2] * A[2][1]), 
          (A[0][0] * A[2][2] - A[0][2] * A[2][0]), 
          -(A[0][0] * A[2][1] - A[0][1] * A[2][0]) 
        ],
        [
          (A[0][1] * A[1][2] - A[0][2] * A[1][1]), 
          -(A[0][0] * A[1][2] - A[0][2] * A[1][0]), 
          (A[0][0] * A[1][1] - A[0][1] * A[1][0]) 
        ]
    ];

    let adjoint = [
      [C[0][0], C[1][0], C[2][0]],
      [C[0][1], C[1][1], C[2][1]],
      [C[0][2], C[1][2], C[2][2]]
    ];

    adjoint.forEach((row)=>{

      row.forEach((value)=>{
        value= value / detA
      })

    })

    return adjoint ;
  }

}

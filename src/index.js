function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.replace(/\s/g, '');

    if (~expr.indexOf('/0')) {
        throw new Error('TypeError: Devision by zero.');
    }

    if (!check(expr, [['(', ')']])) {
        throw new Error('ExpressionError: Brackets must be paired');
    }    

    return expr;
}

module.exports = {
    expressionCalculator
}
 
// console.log(expressionCalculator("2     /0     + 2"));

 function check(str, bracketsConfig) {
    // your solution
    let counter = [];
    for (let i = 0; i < bracketsConfig.length; i++) {
      counter[i] = 0;      
    }
  
    let bracketType = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < bracketsConfig.length; j++) {
            if (str[i] === bracketsConfig[j][0]) {
              if ((str[i] === bracketsConfig[j][0]) && (str[i] === bracketsConfig[j][1]) && (counter[j] === 1)) {
                // 
              } else {
                bracketType[i] = 'open';
                counter[j]++;               
              }
            }
  
            if (str[i] === bracketsConfig[j][1]) {
                if (counter[j] < 1) {
                    return false;
                }
  
                if ((str[i] === bracketsConfig[j][0]) && (str[i] === bracketsConfig[j][1]) && (bracketType[i] === 'open')) {
                  // 
                } else {
                  bracketType[i] = 'close';
                  counter[j]--;   
                  
                  if ((bracketType[i - 1] === 'open') && (str[i - 1] !== bracketsConfig[j][0])) {
                    return false;
                  }                
                }
            }   
        }      
    }
  
    return counter.join('') == 0;
  }
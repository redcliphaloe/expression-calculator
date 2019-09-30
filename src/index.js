function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.replace(/\s/g, '');

    if (~expr.indexOf('/0')) {
        throw new Error('TypeError: Division by zero.');
    }

    if (!check(expr, [['(', ')']])) {
        throw new Error('ExpressionError: Brackets must be paired');
    }    

    let operands = [];
    let operators = [];
    priority = {
        '(': -2,
        ')': -1,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2        
    }
    let subExpr = '';
    while (expr.length > 0) {
        subExpr = expr[0];
        if (!priority.hasOwnProperty(subExpr)) {        
            subExpr = parseInt(expr);
            operands.push(subExpr);
            subExpr += '';     
        } else { 
            switch (subExpr) {
                case '(':
                    operators.push(subExpr);
                    break;
                case ')':
                    while ((operators.length) && (priority[subExpr] <= priority[operators[operators.length - 1]])) {
                        operands.push(calc(operands.pop(), operators.pop(), operands.pop()));
                    }                                    
                    operators.pop();
                    break;

                default:
                    while ((operators.length) && (priority[subExpr] <= priority[operators[operators.length - 1]])) {
                        operands.push(calc(operands.pop(), operators.pop(), operands.pop())); 
                    }        
                    operators.push(subExpr);                    
                    break;
            }
        }          
        
        expr = expr.slice(subExpr.length); 
    }
    
    while ((operators.length)) {
        operands.push(calc(operands.pop(), operators.pop(), operands.pop()));
    }
     
    return operands[0];
}

module.exports = {
    expressionCalculator
}

function calc(operand2, operator, operand1) {
    let result = 0;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;                                                                        
    
        default:
            break;
    }    
    
    return result;
}   

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
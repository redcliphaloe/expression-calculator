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

    let operands = [];
    let operators = [];
    priority = {
         ')': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }
    let part = '';
    let operand1 = 0;
    let operand2 = 0;
    let operator = '';
    let total = 0;
    while (expr.length > 0) {
        // если число
        if (((expr[0] !== '+') && (expr[0] !== '-'))&& (part = parseInt(expr))) {
            // то добавить операнд в стек
            operands.push(part);
            part += '';        
        } else {
            part = expr[0];
            // если закрывающая скобка или приоритет оператора ниже предыдущего
            if ((part === ')') || ( (operators.length) && 
                (priority[part] <= priority[operators[operators.length - 1]]))) {
                // то рассчитать
                while (((operators.length) && 
                (priority[part] <= priority[operators[operators.length - 1]]))) {
                operand2 = +operands.pop();
                operand1 = +operands.pop();
// console.log(expressionCalculator("1 + 2 * (3 + 4 / 2 - (1 + 2)) * 2 + 1"));                
                switch (operator = operators.pop()) {
                    case '+':
                        operands.push(operand1 + operand2);
                        break;
                    case '-':
                        operands.push(operand1 - operand2);
                        break;
                    case '*':
                        operands.push(operand1 * operand2);
                        break;
                    case '/':
                        operands.push(operand1 / operand2);
                        break;                                                                        
                
                    default:
                        break;
                }
            }
                // удалить из стека открывающую скобку
                if (part === ')') {
                     operators.pop();
                // или добавить текущий оператор
                } else {
                    operators.push(part);
                }
            } else {
                // иначе добавить оператор в стек
                operators.push(part);
            }
        }
        // оставшееся выражения
        expr = expr.slice(part.length);
        // console.log(operands + '     ' + operators);
        // console.log(operators);        
    }
    operand2 = +operands.pop();
    operand1 = +operands.pop();
// console.log(expressionCalculator("1 + 2 * (3 + 4 / 2 - (1 + 2)) * 2 + 1"));                
    switch (operator = operators.pop()) {
        case '+':
            operands.push(operand1 + operand2);
            break;
        case '-':
            operands.push(operand1 - operand2);
            break;
        case '*':
            operands.push(operand1 * operand2);
            break;
        case '/':
            operands.push(operand1 / operand2);
            break;                                                                        
    
        default:
            break;
    }
    // console.log(operands);
    // console.log(operators);
    //expr = parseInt(expr);
    return operands[0];
}

module.exports = {
    expressionCalculator
}
 
// console.log(expressionCalculator("48 + 59 * 86 * 92 * 23"));

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
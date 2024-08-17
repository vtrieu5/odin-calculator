
let operator = '';
let firstNumber = '';
let secondNumber = '';
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => click(button)));
document.addEventListener('keydown', function(event) {
    console.log(event.key);
    if (event.key >= 0 && event.key <= 9) {
        click({className: 'number', textContent: event.key});
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        click({className: 'operator', textContent: event.key});
    } else if (event.key === 'Enter') {
        click({className: 'equals'});
    } else if (event.key === 'c') {
        click({className: 'clear'});
    } else if (event.key === '.') {
        click({className: 'decimal'});
    } else if (event.key === 'Backspace') {
        click({className: 'delete'});
    }
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        return 'DNE';
    }
    return a / b;
}

function clear() {
    operator = '';
    firstNumber = '';
    secondNumber = '';
    display.textContent = 0;
}

function operate (operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Invalid operator';
    }
}

function deleteLast() {
    if (secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else {
        firstNumber = firstNumber.slice(0, -1);
    }
    if (firstNumber === '') {
        clear();
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function changeSign() {
    if (secondNumber !== '') {
        secondNumber = -1 * parseFloat(secondNumber);
    } else {
        firstNumber = -1 * parseFloat(firstNumber);
    }
    display.textContent = firstNumber + operator + secondNumber;
}

function decimal() {
    if (secondNumber !== '') {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            display.textContent += '.';
        }
    } else if (operator !== '') {
        secondNumber = '0.';
        display.textContent += '0.';
    } else {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            display.textContent += '.';
        }
    }
}

function notation(number) {
    return Number.parseFloat(number).toExponential(5);
}

function click(button) {
    if (button.className === "number") {
        if (operator === '') {
            firstNumber += button.textContent;
            if (display.textContent === '0') {
                display.textContent = button.textContent;
            } else {
                display.textContent += button.textContent
            }
        } else {
            secondNumber += button.textContent;
            display.textContent += button.textContent;
        }
    } else if (button.className === "operator") {
        if (secondNumber !== '') {
            firstNumber = operate(operator, firstNumber, secondNumber);
            secondNumber = '';
            operator = button.textContent;
            if (display.textContent.length > 10) {
                firstNumber = notation(firstNumber);
            }
            display.textContent = firstNumber + operator;
        } else if (display.textContent === '0') {
            operator = button.textContent;
            firstNumber = '0';
            display.textContent += operator;
        }
        else if (operator === '') {
            operator = button.textContent;
            display.textContent += operator;
        }
    } else if (button.className === "clear") {
        clear();
    } else if (button.className === "equals" && operator !== '' && 
        firstNumber !== '' && secondNumber !== '') {
        display.textContent = operate(operator, firstNumber, secondNumber);
        if (display.textContent.length > 10) {
            display.textContent = notation(display.textContent);
        }
        firstNumber = display.textContent;
        operator = '';
        secondNumber = '';
    } else if (button.className === "delete") {
        deleteLast();
    } else if (button.className === "plusMinus") {
        changeSign();
    } else if (button.className === "decimal") {
        decimal();
    }
}


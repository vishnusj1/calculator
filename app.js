const buttons = document.querySelectorAll('[data-action]');
const operands = document.querySelectorAll('[data-action=number]');
const operators = document.querySelectorAll('[data-operator]');
const display = document.querySelector('.calc-result');
const displayText = display.querySelector('h3');
const calculateButton = document.querySelector("[data-operator=equal]");
const clearButton = document.querySelector('[data-operator=clear]')
const deleteButton = document.querySelector('[data-operator=delete]')

let firstValue = 0;
let secondValue = 0;
let op;
let lastPressedKey;
// console.log(operators);

operands.forEach(operand => operand.addEventListener('click', populateDisplay));

function populateDisplay() {
    operandText = this.textContent;
    if (lastPressedKey === 'calculate') resetValue();
    if (displayText.textContent === '0' || lastPressedKey === 'operator' || lastPressedKey === 'calculate') {
        displayText.textContent = operandText;
    } else {
        displayText.textContent += operandText;
    }
    lastPressedKey = 'number';
    // console.log(operandText);
    clearButton.textContent = 'CE'
}

operators.forEach(operator => operator.addEventListener(('click'), operate));

function operate() {
    operator = this.dataset.operator;
    if (operator === 'decimal') {
        if (!displayText.textContent.includes('.')) {
            displayText.textContent += '.'
        }
        if (lastPressedKey === 'calculate' || lastPressedKey === 'operator') {
            displayText.textContent = '0.';
        }
        lastPressedKey = 'decimal';
    }

    if (lastPressedKey !== 'operator') {
        if (operator === 'add' || operator === 'subtract' || operator === 'multiply' || operator === 'divide' || operator === 'modulus') {

            if (firstValue && op) {
                secondValue = displayText.textContent;
                const result = calculate(firstValue, op, secondValue);
                displayText.textContent = result;
            }
            if (displayText.textContent !== '0') {
                op = operator;
                firstValue = displayText.textContent;
                lastPressedKey = 'operator';
                // console.log(`firstValue = ${firstValue}\noperator = ${op}\nsecondValue = ${secondValue}`);
            }
            if (firstValue && op === 'modulus') {
                secondValue = 100;
                const result = calculate(firstValue, op, secondValue);
                console.log(result);
                displayText.textContent = result;
                firstValue = 0;
                secondValue = 0;
                op = 0;
            }
        }
    }

    if (operator === 'equal') {
        if (lastPressedKey === 'operator' || lastPressedKey === 'calculate') {
            secondValue = displayText.textContent;
            const result = calculate(firstValue, op, secondValue);
            displayText.textContent = result;
            // lastPressedKey = 'calculate';
        }
        if (lastPressedKey === 'number') {
            secondValue = displayText.textContent;
            const result = calculate(firstValue, op, secondValue);
            displayText.textContent = result || displayText.textContent;
            resetValue();
        }
        lastPressedKey = 'calculate';
        // console.log(`firstValue = ${firstValue}\noperator = ${op}\nsecondValue = ${secondValue}\n result=${result}`);
    }

}

function calculate(firstValue, op, secondValue) {
    let a = parseFloat(firstValue);
    let b = parseFloat(secondValue);
    if (op === 'add') {
        return a + b;
    }
    if (op === 'subtract') {
        return a - b;
    }
    if (op === 'multiply') {
        return a * b;
    }
    if (op === 'divide') {
        return a / b;
    }
    if (op === 'modulus') {
        return a / b;
    }
}

function resetValue() {
    firstValue = 0;
    secondValue = 0;
    op = '';
}

clearButton.addEventListener('click', clear)

function clear() {
    firstValue = 0;
    secondValue = 0;
    op = 0;
    displayText.textContent = 0;
    clearButton.textContent = "AC";
}

deleteButton.addEventListener('click', deleteNum)

function deleteNum() {
    displayText.textContent = displayText.textContent.toString().slice(0, -1);
    if (displayText.textContent === '') {
        clearButton.textContent = 'AC';
        displayText.textContent = '0';
    }
}
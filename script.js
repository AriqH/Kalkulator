let perhitungan = [];

const calculator = {
    displayNumber : '0',
    result : false
};

function updateOperator(variable) {
    if (perhitungan.length == 0) {
        document.querySelector('#displayOperator').innerText = ' ' + calculator.displayNumber + ' ' + variable;
    } else if(variable == null) {
        document.querySelector('#displayOperator').innerText += ' ' + calculator.displayNumber;
    } else {
        document.querySelector('#displayOperator').innerText += ' ' + calculator.displayNumber + ' ' + variable;
    }
}

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function clearCalculator() {
    calculator.displayNumber = '0';
    document.querySelector('#displayOperator').innerText = 0;
    perhitungan = [];
}

function clear() {
    calculator.displayNumber = '0'
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    perhitungan.push(calculator.displayNumber);
    perhitungan.push(operator);

    calculator.displayNumber = '0';
}

function calculation(number1, operator, number2) {
    if (operator === '+') {
        return number1 + number2;
    } else if (operator === '-')
        return number1 - number2;
}

function performCalculation() {
    if(!calculator.result) {
        perhitungan.push(calculator.displayNumber);
        let result = 0;
        let array = perhitungan.length;
        if (perhitungan[array - 1] == '-' || perhitungan[array - 1] == '+' || array%2 == 0 || array < 3) {
            alert('Selesaikan Operator')
        } else {
            let i = 0;
            while (i < array) {
                if (i == 0) {
                    result = calculation(parseInt(perhitungan[i]),perhitungan[i + 1],parseInt(perhitungan[i + 2]))
                    i += 3;
                } else {
                    result = calculation(result,perhitungan[i],parseInt(perhitungan[i + 1]))
                    i += 2;
                }
            }
            calculator.displayNumber = result;
            calculator.result = true;
        }
    }
}

const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
    button.addEventListener('click', function (event) {
        const target = event.target;
        if (calculator.result){
            clearCalculator();
            updateDisplay();
            calculator.result = false;
            return;
        }

        if (target.classList.contains('clearAll')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('clear')) {
            clear();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            updateOperator();
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            updateOperator(target.innerText);
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}


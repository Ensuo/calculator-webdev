const display = document.querySelector("#display");
const grid = document.querySelector("#buttons-grid");


let displayValue = '0';
let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let resetScreen = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return (parseFloat(a * b).toPrecision(12));
}

function divide(a, b) {
    return (parseFloat(a / b).toPrecision(12));
}

function calc(operation, a, b) {
    currentOperation = null;
    int_a = parseInt(a);
    int_b = parseInt(b);
    switch (operation) {
        case '+':
            return add(int_a, int_b);
            break;
        case '-':
            return subtract(int_a, int_b);
            break;
        case '*':
            return multiply(int_a, int_b);
            break;
        case '/':
            return divide(int_a, int_b);
            break;
    }
}

function updateDisplay(value) {
    text = document.createTextNode(value);
    display.appendChild(text);
}

function resetDisplay() {
    display.innerHTML = "";
}

function resetValues(){
    displayValue = '0';
    firstNumber = "";
    secondNumber = "";
    currentOperation = null;
    resetScreen = false;    
}

function inputNumber(value){
    if(currentOperation == null){
        resetDisplay();
        if(firstNumber == '0'){
            firstNumber = value;
        }else{
            firstNumber += value;
        }
        displayValue = firstNumber;
    }else{
        resetDisplay();
        secondNumber += value;
        displayValue = secondNumber;
    }
}

function displayAddition(){
    if(firstNumber != ''){
        if(secondNumber == ''){
            currentOperation = '+';
        }else{
            firstNumber = calc(currentOperation, firstNumber, secondNumber);
            displayValue = firstNumber;
            secondNumber = '';
            currentOperation = '+';
        }
    }
}

function displaySubtraction(){
    if(firstNumber != ''){
        if(secondNumber == ''){
            currentOperation = '-';
        }else{
            firstNumber = calc(currentOperation, firstNumber, secondNumber);
            displayValue = firstNumber;
            secondNumber = '';
            currentOperation = '-';
        }
    }
}

function displayMultiplication(){
    if(firstNumber != ''){
        if(secondNumber == ''){
            currentOperation = '*';
        }else{
            firstNumber = calc(currentOperation, firstNumber, secondNumber);
            displayValue = firstNumber;
            secondNumber = '';
            currentOperation = '*';
        }
    }
}

updateDisplay(displayValue);


document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function (e) {
        switch (e.target.classList[1]) { //switch case, depending on the name of the second class
            case 'number':

                inputNumber(e.target.innerHTML);
                break;
            case 'plus':
                displayAddition();
                break;
            case 'minus':
                displaySubtraction()
                break;
            case 'multiplication':
                
                break;
            case 'division':
                currentOperation = '/';
                break;
            case 'equal':
                if(firstNumber != '' && secondNumber != '' && currentOperation != null){
                    firstNumber = calc(currentOperation, firstNumber, secondNumber);
                    console.log(firstNumber);
                    displayValue = firstNumber;
                    secondNumber = "";
                }
                break;
            case 'reset':
                resetValues();
                break;
        }
        resetDisplay();
        updateDisplay(displayValue)
    });
});

const display = document.querySelector("#display");
const grid = document.querySelector("#buttons-grid");


let displayValue = '0';
let firstNumber = '';
let secondNumber = '';
let currentSign = '+';
let currentOperation = null;
let isFloat = false;

//Math operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}
//Does the calculations, depending on the currentOperator
function calc(operation, a, b) {
    currentOperation = null;
    if(isFloat){
        a_value = parseFloat(a);
        b_value = parseFloat(b);
    }else{
        a_value = parseInt(a);
        b_value = parseInt(b);
    }
    switch (operation) {
        case '+':
            return add(a_value, b_value);
            break;
        case '-':
            return subtract(a_value, b_value);
            break;
        case '*':
            return multiply(a_value, b_value);
            break;
        case '/':
            return divide(a_value, b_value);
            break;
    }
}

//Updates the value being displayed
function updateDisplay(value) {
    text = document.createTextNode(value);
    display.appendChild(text);
}

//Resets value of display
function resetDisplay() {
    display.innerHTML = "";
}

//Resets all variables
function resetValues(){
    displayValue = '0';
    firstNumber = "";
    secondNumber = "";
    currentSign = '+';
    currentOperation = null;
    isFloat = false;    
}

function inputNumber(value){
    if(currentOperation == null){ //If there is no operation, then it is the first number being inputed.
        resetDisplay();
        if(firstNumber == '0'){ //If it's still 0, then it's the first number being inputed since the start or after a reset.
            firstNumber = value;
        }else{//After the first digit
            firstNumber += value;
        }
        displayValue = firstNumber; //First number being displayed
    }else{ //If a math operation was already chosen, then that must mean the first Number has already been chosen, so start creating second number.
        resetDisplay();
        secondNumber += value;
        displayValue = secondNumber; //Second Number now being displayed
    }
}

//Math functions that update the value being displayed, result depending on the given operation.

function values_calc(operation){
    if(firstNumber != ''){
        if(secondNumber == ''){
            if(isFloat){
                isFloat = false;
            }
            currentOperation = operation;
        }else{
            firstNumber = calc(currentOperation, firstNumber, secondNumber);
            displayValue = firstNumber;
            secondNumber = '';
            currentOperation = operation;
        }
    }
}

//Converts current number to float
function toFloat(){
    if(secondNumber == ''){
        if(firstNumber != '' && !isFloat){
            isFloat = true;
            firstNumber += '.';
            displayValue = firstNumber;

        }
    }else{
        if(secondNumber != '' && !isFloat){
            isFloat = true;
            secondNumber += '.';
            displayValue = secondNumber;
        }
    }
}

//Change sign of current number being displayed
function changeSign(){
    if(displayValue != '0'){
        if(currentSign == '+'){
            currentSign = '-';
        }else{
            currentSign = '+';
        
        }
        if(secondNumber == ''){
            if(isFloat){
                firstNumber = parseFloat(firstNumber) * - 1;
            }else{
                firstNumber = parseInt(firstNumber) * -1;
            }
            displayValue = firstNumber;
        }else{
            if(isFloat){
                secondNumber = parseFloat(secondNumber) * - 1;
            }else{
                secondNumber = parseInt(secondNumber) * -1;
            }
            displayValue = secondNumber;
        }
    }
}

//Function that executes the current math expression
function equals(){
    if(firstNumber != '' && secondNumber != '' && currentOperation != null){
        firstNumber = calc(currentOperation, firstNumber, secondNumber);
        if(isFloat){
            isFloat = false;
        }
        displayValue = firstNumber;
        secondNumber = "";
    }
}

updateDisplay(displayValue); //Adds the 0 to display

//Adds the functionality to each button
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function (e) {
        switch (e.target.classList[1]) { //switch case, depending on the name of the second class
            case 'number':
                inputNumber(e.target.innerHTML);
                break;
            case 'sign':
                changeSign();
                break;
            case 'plus':
                values_calc('+');
                break;
            case 'minus':
                values_calc('-');
                break;
            case 'multiplication':
                values_calc('*');
                break;
            case 'division':
                values_calc('/');
                break;
            case 'equal': //If the equal button is clicked, and all required values are given (first, second number and operation), then the new display value is the result.
                equals();
                break;
            case 'dot':
                toFloat();
                break;
            case 'reset': //Resets all variable values, and display to their initial values.
                resetValues();
                break;
        }
        resetDisplay(); //After each operation, update the values being displayed
        updateDisplay(displayValue)
    });
});

//key presses
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    
    if(!isNaN(keyName)){ //if key pushed is a number
        inputNumber(keyName);
    }else if(keyName.match(/[+\-\/*]$/)){ //if key pushed is an operation symbol
        values_calc(keyName);
    }else if(keyName == '.'){//if key is a decimal dot
        toFloat();
    }else if(keyName == '=' || keyName == 'Enter'){ //if key is either an = symbol or an enter key
        equals();
    }else if(keyName == 'Escape'){
        resetValues();
    }
    resetDisplay(); //After each operation, update the values being displayed
    updateDisplay(displayValue)
});

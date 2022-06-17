const allClearBTN = document.querySelector('[btn-allClear]');
const clearBTN = document.querySelector('[btn-clear]');
const operationsBTN = document.querySelectorAll('[btn-operations]');
const numbersBTN = document.querySelectorAll('[btn-numbers]');
const equalBTN = document.querySelector('[btn-equal]');
const prevDisplayText = document.querySelector('[prev-display]');
const resDisplayText = document.querySelector('[res-display]');

class Calculator {
    constructor(prevDisplayText, resDisplayText){
        this.prevDisplayText = prevDisplayText;
        this.resDisplayText = resDisplayText;
        this.allClear();
    };

    calculate(){
        let result;

        const prevDisplayFloat = parseFloat(this.prevDisplay);
        const resDisplayFloat = parseFloat(this.resDisplay);

        if(isNaN(prevDisplayFloat) || isNaN(resDisplayFloat)) return;

        switch(this.opeation){
            case '+':
                result = prevDisplayFloat + resDisplayFloat
                break;
            case '-': 
                result = prevDisplayFloat - resDisplayFloat
                break;
            case '*': 
                result = prevDisplayFloat * resDisplayFloat
                break;
            case '÷': 
                result = prevDisplayFloat / resDisplayFloat
                break;
            default:
                return;
        };

        this.resDisplay = result;
        this.opeation = undefined;
        this.prevDisplay = '';
    };

    allClear(){
        this.prevDisplay = '';
        this.resDisplay = '';
        this.opeation = undefined;
    };

    clearLast(){
        this.resDisplay = this.resDisplay.toString().slice(0, -1);
    };

    attDisplay(){
        this.prevDisplayText.innerText = `${this.prevDisplay} ${this.opeation || ''}`;
        this.resDisplayText.innerText = `${this.resDisplay}`;
    };

    addNumber(num){
        if(this.resDisplay.includes('.') && num === '.') return;
        this.resDisplay += num.toString();
    };

    addOperation(operation){
        if(this.resDisplay === '') return;
        if(this.prevDisplay != ''){
            this.calculate();
        };

        this.opeation = operation
        this.prevDisplay = `${this.resDisplay}`
        this.resDisplay = ''
    };
};

const calculator = new Calculator(prevDisplayText, resDisplayText)

allClearBTN.addEventListener('click', () => {
    calculator.allClear();
    calculator.attDisplay();
});

for(const numberBTN of numbersBTN){
    numberBTN.addEventListener('click', () => {
        calculator.addNumber(numberBTN.textContent);
        calculator.attDisplay();
    });
};

for (const operationBTN of operationsBTN){
    operationBTN.addEventListener('click', () => {
        calculator.addOperation(operationBTN.textContent);
        calculator.attDisplay();
    });
};

equalBTN.addEventListener('click', () => {
    calculator.calculate();
    calculator.attDisplay();
});

clearBTN.addEventListener('click', () => {
    calculator.clearLast();
    calculator.attDisplay();
});
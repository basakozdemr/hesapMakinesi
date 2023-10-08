alert("Hesap Makinesi");

const display = document.querySelector('.hesapMakinesi-input');
const keys = document.querySelector('.hesapMakinesi-keys');

let displayValue = '0';
let ilkDeger = null;
let operator = null;
let ikinciDegerBekleniyorMu = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function (e) {
    const element = e.target;
    console.log(typeof element.value, parseFloat(element.value), typeof parseFloat(element.value));
    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if (element.classList.contains('ondalık')) {
        inputOndalık();
        updateDisplay();
        return;
    }

    if (element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});



function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && ikinciDegerBekleniyorMu) {
        operator = nextOperator;
        return;
    }

    if (ilkDeger === null) {
        ilkDeger = value;
    }
    else if (operator) {
        const sonuc = hesapla(ilkDeger, value, operator);

        displayValue = `${parseFloat(sonuc.toFixed(7))}`;
        ilkDeger = sonuc;
    }

    ikinciDegerBekleniyorMu = true;
    operator = nextOperator;

}


function hesapla(birinci, ikinci, operator) {
    if (operator === '+') {
        return birinci + ikinci;
    } else if (operator === '-') {
        return birinci - ikinci;
    } else if (operator === '*') {
        return birinci * ikinci;
    } else if (operator === '/') {
        return birinci / ikinci;
    }
    return ikinci;
}

function inputNumber(num) {
    if (ikinciDegerBekleniyorMu) {
        displayValue = num;
        ikinciDegerBekleniyorMu = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

}

function inputOndalık() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}
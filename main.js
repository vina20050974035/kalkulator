// Setting
const setting = document.querySelectorAll('#setting .btn');

//Tombol Light
setting[0].addEventListener('click', function(){
    const darkOut = document.querySelectorAll('.dark-out');
    const darkIn = document.querySelectorAll('.dark-in');

    for (let i=0; i< darkOut.length; i++){
        darkOut[i].classList.remove('dark-out');
        darkOut[i].classList.add('light-out');
    }
    for (let i=0; i< darkIn.length; i++){
        darkIn[i].classList.remove('dark-in');
        darkIn[i].classList.add('light-in');
    }
    document.body.style.backgroundColor = '#ececec';
    document.body.style.color = 'black';

    const pContent = document.querySelector('.history-content p');
    if (pContent !== null) {
        pContent.style.borderBottom = '1px solid black';
    }
});

// Tombol Dark
setting[1].addEventListener('click', function(){
    const lightOut = document.querySelectorAll('.light-out');
    const lightIn = document.querySelectorAll('.light-in');

    for (let i=0; i< lightOut.length; i++){
        lightOut[i].classList.remove('light-out');
        lightOut[i].classList.add('dark-out');
    }
    for (let i=0; i< lightIn.length; i++){
        lightIn[i].classList.remove('light-in');
        lightIn[i].classList.add('dark-in');
    }

    const pContent = document.querySelector('.history-content p');
    if (pContent !== null) {
        pContent.style.borderBottom = '1px solid white';
    }
    document.body.style.backgroundColor = '#091921';
    document.body.style.color = 'greenyellow';
});

// Tombol clear history
setting[2].addEventListener('click', function(){
    const history = document.querySelector('#history .history-content');
    const p = history.querySelectorAll('p');
    for(let i=0; i<p.length; i++){
        history.removeChild(p[i]);
    }
});

// Kalkulator

const calculator = {
    displayNum : '0',
    operator : null,
    firstNum : null,
    operasi : false,
}

function updateDisplay(){
    const display = document.querySelector('.display');
    display.innerText = calculator.displayNum;
}

function clear(){
    calculator.displayNum = '0';
    calculator.operator = null;
    calculator.firstNum = null;
    calculator.operasi = false;
}

function input(digit){
    if(calculator.displayNum === '0'){
        calculator.displayNum = digit;
    } else {
        calculator.displayNum += digit;
    }
}

function operasi(operator){
    if(!calculator.operasi){
        calculator.operator = operator;
        calculator.firstNum = calculator.displayNum;
        calculator.displayNum = '0';
        calculator.operasi = true;
    } else {
        alert('Operator sudah ditetapkan');
    }
}

function calculate(op){
    if(op == '+'){

        //masukkan ke history
        const his = document.querySelector('.history-content');
        let secondNum = calculator.displayNum;

        calculator.displayNum = parseFloat(calculator.firstNum) + parseFloat(calculator.displayNum);

        const hasil = document.createTextNode(calculator.firstNum + op + secondNum + ' = ' + calculator.displayNum);
        const p = document.createElement('p');
        p.appendChild(hasil);
        his.appendChild(p);

    } else if(op == '-'){
        const his = document.querySelector('.history-content');
        let secondNum = calculator.displayNum;

        calculator.displayNum = parseFloat(calculator.firstNum) - parseFloat(calculator.displayNum);

        const hasil = document.createTextNode(calculator.firstNum + op + secondNum + ' = ' + calculator.displayNum);
        const p = document.createElement('p');
        p.appendChild(hasil);
        his.appendChild(p);
    }

    else if(op == '*'){
        const his = document.querySelector('.history-content');
        let secondNum = calculator.displayNum;
        
        calculator.displayNum = parseFloat(calculator.firstNum) * parseFloat(calculator.displayNum);
    
        const hasil = document.createTextNode(calculator.firstNum + op + secondNum + ' = ' + calculator.displayNum);
        const p = document.createElement('p');
        p.appendChild(hasil);
        his.appendChild(p);
    }

    else if(op == '/'){
        const his = document.querySelector('.history-content');
        let secondNum = calculator.displayNum;

        calculator.displayNum = parseFloat(calculator.firstNum) / parseFloat(calculator.displayNum);
    
        const hasil = document.createTextNode(calculator.firstNum + op + secondNum + ' = ' + calculator.displayNum);
        const p = document.createElement('p');
        p.appendChild(hasil);
        his.appendChild(p);
    }
    updateDisplay();
}

//numpad

const buttons = document.querySelectorAll('.keypad .numpad');
for (let btn of buttons){
    btn.addEventListener('click', function(e){
        //clear
        if(e.target.classList.contains('clear')){
            clear();
            updateDisplay()
            return;
        }
        //invers
        if(e.target.classList.contains('invers')){
            calculator.displayNum *= -1;
            updateDisplay();
            return;
        }    
        //del
        if(e.target.classList.contains('del')){
            const del = calculator.displayNum.length - 1;
            if(del == 0){
                calculator.displayNum = '0';
            } else {
                calculator.displayNum = calculator.displayNum.substr(0, del);
            }
            updateDisplay();
            return;
        }
        //Percent
        if(e.target.classList.contains('percent')){
            calculator.displayNum /= 100
            updateDisplay();
            return;
        }
        // Operator
        if(e.target.classList.contains('operator')){
            operasi(e.target.innerText);
            return;
        }
        // Sama dengan
        if(e.target.classList.contains('equals')){
            calculate(calculator.operator);
            clear();
            return;
        }

        input(e.target.innerText);
        updateDisplay();
    })
}
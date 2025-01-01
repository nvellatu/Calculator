//make calc dragable
const calculator = document.querySelector('.calculator');
let isDragging = false;
let offsetX = 0, offsetY = 0;

calculator.addEventListener('mousedown', (e) => {
    if (!e.target.closest('button')) {
        isDragging = true;
        offsetX = e.clientX - calculator.getBoundingClientRect().left;
        offsetY = e.clientY - calculator.getBoundingClientRect().top;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        calculator.style.position = 'absolute'; // Ensure absolute positioning
        calculator.style.left = `${e.clientX - offsetX}px`;
        calculator.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false; 
});


function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mult(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}
function operate(a, op, b){
    a = parseFloat(a);
    b = parseFloat(b);
    if (op == '+'){
        return add(a, b);
    }
    else if (op == '-'){
        return sub(a, b);
    }
    else if (op == '*'){
        return mult(a, b);
    }
    else if (op == '/'){
        return div(a, b);
    }
}

const display = document.querySelector('.calculator-display')

let n1 = '';
let n2 = '';
let op = '';
let hasDec = false;

let pointer = 'n1';
function populate(n){
    
    if ((n1 && n2 && op)&&(n === '+' || n === '-' || n === '*' || n === '/' || n === '=') ){
        if (n === '=') {
            result =String(operate(n1, op, n2))
            display.textContent += '\n' + result; 
            n1 = result;
            if (result.includes('.')) {hasDec=true;}
            op = '';
            n2 = '';
            pointer = 'n1';
        }
        else if (n === '+' || n === '-' || n === '*' || n === '/'){
            result =String(operate(n1, op, n2))
            display.textContent += '\n' + result + n; 
            if (result.includes('.')) {hasDec=true;}
            n1 = result;
            op = n;
            n2 = '';
            pointer = 'n2';
            hasDec = false;
        }
    }
    else if (n==='='){
        return;
    }
    else if (n === '+' || n === '-' || n === '*' || n === '/'){
        if (!n1){return;}
        if (op === '' && pointer==='n1'){
            pointer = 'n2';
            hasDec = false;
            op = n;
            display.textContent = n1 + op;
        }
        else if (pointer==='n2' && n2===''){
            op = n;
            display.textContent = n1 + op;
        }

    }

    else if (pointer === 'n1'){
        if ((n==='.') && !(n1.includes('.'))){
            n1 += String(n);
            display.textContent = n1; 
        }
        else if (n!=='.'){
            n1 += String(n);
            display.textContent = n1; 
        }
        
    }
    else if (pointer === 'n2'){
        if ((n==='.') && !(n2.includes('.'))){
            n2+=String(n);
            display.textContent = n1 + op + n2; 
        }
        else if (n!=='.'){
            n2+=String(n);
            display.textContent = n1 + op + n2; 
        }
    }
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    n1 = '';
    n2 = '';
    op = '';
    pointer = 'n1';
    display.textContent = '';
});

const del = document.querySelector('.delete');
del.addEventListener('click', () => {
    if (pointer==='n2'){
        if (!n2) {
            if (op) {
                op = '';
                display.textContent = n1 + op + n2;

            }
            pointer = 'n1';
        }
        else {
            n2 = n2.slice(0,-1);
            display.textContent = n1 + op + n2;
        }
    }
    else if (pointer==='n1'){
        n1 = n1.slice(0,-1);
        display.textContent = n1 + op + n2;
    }
});
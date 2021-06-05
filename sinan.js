//  ------------------ DOM elemanları ------------------ //

const btn = document.querySelector('.btn');
const choose1 = document.querySelector('.choose-1');
const choose2 = document.querySelector('.choose-2');
const choose3 = document.querySelector('.choose-3');

const lifeText = document.querySelector('.life-text');
const lifeScore = document.querySelector('.life-score');

const resultText = document.querySelector('.result-text');
const startText = document.querySelector('.start-text');

//  ------------------ DOM elemanları ------------------ //

//  ------------------ Başlangıç Değerleri ------------------ //

let backgroudColor;
let life = 5;
let score = 0;
let wrongScore = 0;
//  ------------------ Başlangıç Değerleri ------------------ //

//  ------------------ Fonksiyonlar ------------------ //
function visibleEl(...args) {
    for (let arg of args) {
        arg.classList.remove('hidden');
    }
}

function hiddenEl(...args) {
    for (let arg of args) {
        arg.classList.add('hidden');
    }
}

function changeValue(...args) {
    for (let i = 0; i < args.length; i++) {
        args[i][0].textContent = args[i][1];
    }
}

function randomHex() {
    const hex = [0, 1, 'A', 2, 3, 'B', 4, 5, 6, 'C', 7, 'D', 8, 'E', 'F', 9];
    let hexCode = '#';
    let randomNumber;
    for (let i = 0; i < 6; i++) {
        randomNumber = Math.floor(Math.random() * hex.length);
        hexCode += hex[randomNumber];
    }
    return hexCode;
}

function ready() {
    // Doğru hex kutusunu belirleyip arkaplan hexini ona verelim.
    let randomNumber = Math.floor(Math.random() * 3);
    const boxes = [choose1, choose2, choose3];
    backgroudColor = randomHex();
    document.body.style.backgroundColor = backgroudColor;

    // Yanlış hex kutularına randomHex verelim.
    boxes[randomNumber].textContent = backgroudColor;
    boxes.splice(randomNumber, 1);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = randomHex();
    }
}

function check(arg) {
    if (arg.textContent !== backgroudColor) {
        console.log('yanlış');
        hiddenEl(arg);
        life--;
        resultText.style.color = 'red';
        changeValue([lifeScore, life], [resultText, 'Wrong :(']);
        visibleEl(resultText);
        wrongScore++;
    } else {
        console.log('doğru');
        score++;
        ready();
        visibleEl(choose1, choose2, choose3);
        resultText.style.color = 'green';
        changeValue([resultText, 'Correct :)']);
        visibleEl(resultText);
        wrongScore = 0;
    }

    // 2 kez yanlış yaparsa tek kutuya düşmemesi için..
    if (wrongScore === 2) {
        wrongScore = 0;
        ready();
        visibleEl(choose1, choose2, choose3);
    }

    // Canı kalmadıysa..
    if (life === 0) {
        hiddenEl(choose1, choose2, choose3, resultText);
        visibleEl(btn);
        changeValue(
            [startText, 'Game Over!'], [lifeScore, score], [lifeText, 'Score']
        );
        life = 5;
        score = 0;
        wrongScore = 0;
    }
}
//  ------------------ Fonksiyonlar ------------------ //

//  ------------------ Event Listeners ------------------ //
btn.addEventListener('click', function() {
    visibleEl(choose1, choose2, choose3);
    hiddenEl(btn);
    changeValue([startText, 'Choose one'], [lifeText, 'Life'], [lifeScore, life]);
    ready();
});
choose1.addEventListener('click', () => {
    check(choose1);
});
choose2.addEventListener('click', () => {
    check(choose2);
});
choose3.addEventListener('click', () => {
    check(choose3);
});
//  ------------------ Event Listeners ------------------ //
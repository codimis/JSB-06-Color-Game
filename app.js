//  ------------------------------- DOM elements ------------------------------- //

const btn = document.querySelector('.btn');
const choose1 = document.querySelector('.choose-1');
const choose2 = document.querySelector('.choose-2');
const choose3 = document.querySelector('.choose-3');
const choose4 = document.querySelector('.choose-4');
const choose5 = document.querySelector('.choose-5');
const choose6 = document.querySelector('.choose-6');

const levelChangeDiv = document.querySelector('.level-change');
const easyMode = document.querySelector('.easy');
const mediumMode = document.querySelector('.medium');
const hardMode = document.querySelector('.hard');
const circleMode = document.querySelector('.circle');

const lifeText = document.querySelector('.life-text');
const lifeScore = document.querySelector('.life-score');

const resultText = document.querySelector('.result-text');
const startText = document.querySelector('.start-text');

//  ------------------------------- DOM elements ------------------------------- //

//  ------------------------------- Initial Values  ------------------------------- //

let backgroudColor;
let life;
let score = 0;
let wrongScore = 0;
let gameMode = 0; // 0-> easy, 1-> medium, 2-> hard
switch (gameMode) {
    case 0:
        life = 5;
        break;
    case 1:
        life = 4;
        break;
    case 2:
        life = 2;
        break;
}
//  ------------------------------- Initial Values  ------------------------------- //

//  ------------------------------- Functions ------------------------------- //
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
    const hex = [0, 1, 'A', 2, 3, 'B', 4, 5, 'C', 6, 7, 'D', 8, 'E', 'F', 9];
    let hexCode = '#';
    let randomNumber;
    for (let i = 0; i < 6; i++) {
        randomNumber = Math.floor(Math.random() * hex.length);
        hexCode += hex[randomNumber];
    }
    return hexCode;
}

function createRandomNumber(number) {
    return Math.floor(Math.random() * number);
}

function ready() {
    let boxes = [choose1, choose2, choose3];
    let randomNumber;

    // Oyun moduna göre boxes arrayini ayarlayalım ve doğru olacak kutuyu seçelim.
    if (gameMode === 0) {
        randomNumber = createRandomNumber(3);
    } else if (gameMode === 1) {
        randomNumber = createRandomNumber(4);
        boxes.push(choose4);
    } else if (gameMode === 2) {
        randomNumber = createRandomNumber(6);
        boxes.push(choose4, choose5, choose6);
    }

    // Doğru hex kutusunu belirledik. Arkaplan hexini ona verelim.
    backgroudColor = randomHex();
    document.body.style.backgroundColor = backgroudColor;
    boxes[randomNumber].textContent = backgroudColor;

    // Yanlış hex kutularına random hex verelim.
    boxes.splice(randomNumber, 1);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = randomHex();
    }
}

function check(arg) {
    if (arg.textContent !== backgroudColor) {
        // console.log('yanlış');
        resultText.style.color = 'red';
        changeValue([lifeScore, life], [resultText, 'Wrong :(']);
        visibleEl(resultText);
        if (gameMode === 0) {
            wrongScore++;
            hiddenEl(arg);
        } else if (gameMode === 1 || gameMode === 2) {
            life--;
            changeValue([lifeScore, life]);
            ready();
        }
    } else {
        // console.log('doğru');
        score++;
        ready();
        switch (gameMode) {
            case 0:
                visibleEl(choose1, choose2, choose3);
                break;
            case 1:
                visibleEl(choose1, choose2, choose3, choose4);
                break;
            case 2:
                visibleEl(choose1, choose2, choose3, choose4, choose5, choose6);
                break;
        }
        resultText.style.color = 'green';
        changeValue([resultText, 'Correct :)']);
        visibleEl(resultText);
        wrongScore = 0;
    }

    // 2 kez yanlış yaparsa tek kutuya düşmemesi için..
    if (wrongScore === 2) {
        life--;
        changeValue([lifeScore, life]);
        wrongScore = 0;
        ready();
        switch (gameMode) {
            case 0:
                visibleEl(choose1, choose2, choose3);
                break;
            case 1:
                visibleEl(choose1, choose2, choose3, choose4);
                break;
            case 2:
                visibleEl(choose1, choose2, choose3, choose4, choose5, choose6);
                break;
        }
    }

    // Canı kalmadıysa..
    if (life === 0) {
        switch (gameMode) {
            case 0:
                hiddenEl(choose1, choose2, choose3, resultText);
                break;
            case 1:
                hiddenEl(choose1, choose2, choose3, choose4, resultText);
                break;
            case 2:
                hiddenEl(
                    choose1,
                    choose2,
                    choose3,
                    choose4,
                    choose5,
                    choose6,
                    resultText
                );
                break;
        }
        visibleEl(btn, levelChangeDiv);
        changeValue(
            [startText, 'Game Over!'], [lifeScore, score], [lifeText, 'Score']
        );
        switch (gameMode) {
            case 0:
                life = 5;
                break;
            case 1:
                life = 4;
                break;
            case 2:
                life = 2;
                break;
        }
        score = 0;
        wrongScore = 0;
    }
}

function modeEvents(mode, px) {
    gameMode = mode;
    circleMode.style.margin = `0px ${px}px`;
}
//  ------------------------------- Functions ------------------------------- //

//  ------------------------------- Event Listeners ------------------------------- //
btn.addEventListener('click', function() {
    hiddenEl(levelChangeDiv);
    switch (gameMode) {
        case 0:
            visibleEl(choose1, choose2, choose3);
            hiddenEl(choose4, choose5, choose6);
            break;
        case 1:
            visibleEl(choose1, choose2, choose3, choose4);
            hiddenEl(choose5, choose6);
            life = 4;
            changeValue([lifeText, life]);

            break;
        case 2:
            visibleEl(choose1, choose2, choose3, choose4, choose5, choose6);
            life = 2;
            changeValue([lifeText, life]);

            break;
    }
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
choose4.addEventListener('click', () => {
    check(choose4);
});
choose5.addEventListener('click', () => {
    check(choose5);
});
choose6.addEventListener('click', () => {
    check(choose6);
});
easyMode.addEventListener('click', () => {
    modeEvents(0, 18);
});
mediumMode.addEventListener('click', () => {
    modeEvents(1, 80);
});
hardMode.addEventListener('click', () => {
    modeEvents(2, 147);
});
//  ------------------------------- Event Listeners ------------------------------- //
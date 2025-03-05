let step = 'cross';
let winner = '';
let gameActive = true;

const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cell = document.querySelectorAll('.cell');
const whoGo = document.getElementById('whoGo');
const whoWin = document.getElementById('whoWin');
const newGameButton = document.querySelector('.new');
const info = document.querySelector('.info');


const who = () => {
    if (step == 'cross') {
        whoGo.innerText = 'Kryžiukai';
    } else {
        whoGo.innerText = 'Nuliukai';
    }
};
who();


cell.forEach((item) => {
    item.addEventListener('click', () => {
        if (gameActive && !item.classList.contains('circle') && !item.classList.contains('cross')) {
            item.classList.add(step);
            if (step == 'cross') {
                item.innerText = 'X';
                checkWin('cross');
            } else {
                item.innerText = 'O';
                checkWin('circle');
            }

            if (step === 'cross') {
                step = 'circle';
            } else {
                step = 'cross';
            }

            if (gameActive) who();
        }
    });
});

const checkWin = (player) => {
    for (let i = 0; i < winComb.length; i++) {
        if (
            cell[winComb[i][0]].classList.contains(player) &&
            cell[winComb[i][1]].classList.contains(player) &&
            cell[winComb[i][2]].classList.contains(player)
        ) {
            cell[winComb[i][0]].classList.add('winColor');
            cell[winComb[i][1]].classList.add('winColor');
            cell[winComb[i][2]].classList.add('winColor');
            endGame(player);
            return;
        }
    }
    checkDraw();
};

const checkDraw = () => {
    const allFilled = Array.from(cell).every(
        (item) => item.classList.contains('circle') || item.classList.contains('cross')
    );
    if (allFilled && gameActive) {
        endGame('draw');
    }
};

const endGame = (result) => {
    gameActive = false;
    if (result === 'draw') {
        whoWin.innerText = 'Lygiosios';
    } else {
        if (result === 'cross') {
            winner = 'Kryžiukai';
        } else {
            winner = 'Nuliukai';
        }
        whoWin.innerText = winner;
    }
    document.querySelector('.result').style.display = 'block';
    info.style.display = 'none';
};

newGameButton.addEventListener('click', () => {
    cell.forEach((item) => {
        item.classList.remove('circle', 'cross', 'winColor');
        item.innerText = '';
    });

    step = 'cross';
    winner = '';
    gameActive = true;
    whoWin.innerText = '';
    document.querySelector('.result').style.display = 'none';
    info.style.display = 'block';
    who();
});

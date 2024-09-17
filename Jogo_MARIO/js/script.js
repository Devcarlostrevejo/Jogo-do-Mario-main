const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('scoreDisplay');

let pontos = 0;
let gameStarted = false;
let pontosAdded = false;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

function increasepontos(points) {
    pontos += points;
    scoreDisplay.innerText = pontos.toString().padStart(7, '0');
}

function startGame() {
    if (gameStarted) return;

    gameStarted = true;

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clearInterval(loop);

            setTimeout(() => {
                location.reload();
            }, 5000);
        } 

        else if (pipePosition < 0 && !pontosAdded) {
            increasepontos(10);
            pontosAdded = true;
        }

        if (pipePosition > 0) {
            pontosAdded = false;
        }

    }, 18);
}

document.addEventListener('keydown', (event) => {
    if (!gameStarted) {
        startGame();
    }

    if (event.code === 'Space' || event.code === 'ArrowUp') { 
        jump();
    }
});

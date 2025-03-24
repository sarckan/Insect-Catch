const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');

let seconds = 0;
let score = 0;
let selected_insect = null;
let intervalId;
let nextMessageScore = 20;
let chosenInsectButton = null;

function clearInsectSelection() {
    choose_insect_btns.forEach(btn => btn.classList.remove('selected'));
    chosenInsectButton = null;
}

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInsectSelection();
        btn.classList.add('selected');
        chosenInsectButton = btn;
    });
});

start_btn.addEventListener('click', () => {
    if (chosenInsectButton) {
        const img = chosenInsectButton.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };

        startScreen.classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    } else {
        alert('Please select an insect before starting the game.');
    }
});

function startGame() {
    resetGame();
    intervalId = setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)"/>`;
    insect.addEventListener('click', catchInsect);
    gameScreen.appendChild(insect);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore() {
    score++;
    if (score >= nextMessageScore) {
        message.classList.add('visible');
        nextMessageScore += 20;
    }
    scoreEl.innerHTML = `Score: ${score}`;
}

continueBtn.addEventListener('click', () => {
    message.classList.remove('visible');
});

restartBtn.addEventListener('click', () => {
    startScreen.classList.remove('up');
    resetGame();
    removeAllInsects();
});

function resetGame() {
    clearInterval(intervalId);
    seconds = 0;
    score = 0;
    nextMessageScore = 20;
    timeEl.innerHTML = 'Time: 00:00';
    scoreEl.innerHTML = 'Score: 0';
    message.classList.remove('visible');
    clearInsectSelection();
}

function removeAllInsects() {
    const insects = gameScreen.querySelectorAll('.insect');
    insects.forEach(insect => insect.remove());
}

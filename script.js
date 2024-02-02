const cards = document.querySelectorAll('.card');
const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restart');
const scoreDisplay = document.getElementById('score');
const blackLayer = document.querySelector('.black-layer');

let sequence = ['G.svg', 'O.svg', 'K.svg', 'S.svg', 'U.svg'];
let shuffledSequence = [];
let userSequence = [];
let score = 0;
let canClick = false;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
  displayCardsFaceUp();
  setTimeout(shuffleCards, 2000);
}

function displayCardsFaceUp() {
  cards.forEach((card, index) => {
    const letter = sequence[index];
    const objectElement = card.querySelector('object');
    objectElement.setAttribute('data', letter);
  });
}

function shuffleCards() {
  shuffledSequence = sequence.slice().sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    const objectElement = card.querySelector('object');
    objectElement.setAttribute('data', shuffledSequence[index]);
  });
  setTimeout(() => {
    hideCards();
  }, 2000);
}

function hideCards() {
  cards.forEach((card, index) => {
    const objectElement = card.querySelector('object');
    objectElement.style.visibility = 'hidden';
  });
  canClick = true;
}

cards.forEach((card, index) => {
  card.addEventListener('click', (event) => handleCardClick(event, index));
});

function handleCardClick(event, clickedIndex) {
  if (!canClick) return;

  const clickedCardData = shuffledSequence[clickedIndex]; 

  if (clickedCardData === sequence[userSequence.length]) {
    const clickedCardObject = event.currentTarget.querySelector('object');
    clickedCardObject.style.visibility = 'visible'; 

    userSequence.push(clickedIndex);
    score += 20;
    scoreDisplay.textContent = score;

    if (userSequence.length === sequence.length) {
      score += 20;
      displayMessage("Congratulations! You win!");
    }
  } else {
    alert('Wrong answer. Game over!.');
    restartGame();
    return;
  }
}

function displayMessage(message) {
  const messageDiv = document.querySelector('.message');
  messageDiv.textContent = message;
}

restartButton.addEventListener('click', () => {
  displayMessage('');
});




function restartGame() {
  cards.forEach((card, index) => {
    const objectElement = card.querySelector('object');
    objectElement.setAttribute('data', sequence[index]);
    objectElement.style.visibility = 'visible';
  });
  userSequence = [];
  score = 0;
  scoreDisplay.textContent = score;
  canClick = false;
  shuffledSequence = [];
}
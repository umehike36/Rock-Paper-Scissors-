let pick = document.getElementById('pick');
let result = document.getElementById('result');
let score = document.getElementById('score');
let messages = document.getElementById('messages')
let clickSound = document.getElementById('clickSound');
let winSound = document.getElementById('winSound');
let loseSound = document.getElementById('loseSound');
let drawSound = document.getElementById('drawSound');
let lives = 3;
const hearts = document.querySelectorAll(".heart");
const popup = document.getElementById("gameOverPopup");


const gameContainer = document.querySelector(".game_container");

const gameBackgrounds = [
  "Images/Leo.png",
  "Images/Premium.png",
  "Images/Play_station.png"
];


let userScore = 0;

// Messages arrays
const winMessages = [
  "You crushed it! 🎉",
  "Victory is yours! 🏆",
  "Amazing! Keep it up! 💪",
  "The computer couldn't handle that! 😎"
];

const loseMessages = [
  "Haha, the computer wins again! 🤖",
  "Better luck next time! 😊",
  "You got schooled… but it’s all good 😎",
  "Oops! The computer got lucky! 🍀"
];

const drawMessages = [
  "It's a tie! 🤝",
  "No winner this round… try again!",
  "Draw! Keep your eyes on the prize 👀",
  "Stalemate! The battle continues ⚔️"
];

// Main game function
function playGame(userChoice) {
  // play click sound
  clickSound.currentTime = 0;
  clickSound.play();

  const choices = ['Rock', 'Paper', 'Scissor'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  winner(userChoice, computerChoice);
}

// Determine winner and update UI
const winner = (userChoice, computerChoice) => {

  if (userChoice === computerChoice) {
    drawSound.currentTime = 0;
    drawSound.play();
    const message = drawMessages[Math.floor(Math.random() * drawMessages.length)];
    messages.textContent = message;
    result.textContent = "It's a tie!"
  } 
  else if (
    (userChoice === 'Rock' && computerChoice === 'Scissor') ||
    (userChoice === 'Paper' && computerChoice === 'Rock') ||
    (userChoice === 'Scissor' && computerChoice === 'Paper')
  ) {
    userScore++;
    score.textContent = `Score: ${userScore}`;
    winSound.currentTime = 0;
    winSound.play();
    const message = winMessages[Math.floor(Math.random() * winMessages.length)];
    messages.textContent = message;
    result.textContent = 'You Win!'
  } 
  else {
    loseSound.currentTime = 0;
    loseSound.play();
    loseLife();
    const message = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    messages.textContent = message;
    result.textContent = 'You Lose!'
  }

  pick.textContent = `You picked ${userChoice} | Computer picked ${computerChoice}`;
  
};

function loseLife() {
  if (lives > 0) {
    lives--;
    hearts[lives].classList.add("lost");
  }

  if (lives === 0) {
    popup.classList.add("active")
    // show game over message here
  }
}

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * gameBackgrounds.length);
  gameContainer.style.backgroundImage =
    `url(${gameBackgrounds[randomIndex]})`;
}


function restartGame() {
  userScore = 0;
  score.textContent = "Score: 0";
  pick.textContent = "Make your move 👊";
  result.textContent = "Game restarted 🔄";
  messages.textContent = " ";
   lives = 3;
  hearts.forEach(heart => heart.classList.remove("lost"));
  popup.classList.remove("active");
  clickSound.currentTime = 0;
  clickSound.play();
  setRandomBackground()
}


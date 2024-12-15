var board;
var blocksize = 25;
var rows = 20;
var cols = 20;
var context;

var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var snakebody = [];

var velocityX = 0;
var velocityY = 0;

var foodX;
var foodY;

var intervalid;
var restartButton;
var gameover = false;
var score = 0; // Initialize score to 0
var scoreElement = document.getElementById('score');
var scoreIncrement = 5; // Score increment amount


function startGame() {
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('game-page').classList.remove('hidden');
  initGame();
}

function initGame() {
  board = document.getElementById("board");
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d");
  placefood();
  document.addEventListener("keyup", changeDirection);
  intervalid = setInterval(update, 10000/100);
  restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartGame);
  scoreElement = document.getElementById('score'); 
}

function update() {
  if (gameover) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.width);

  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, blocksize, blocksize);

  if (snakeX == foodX && snakeY == foodY) {
    snakebody.push([snakeX, snakeY]);
    placefood();

    // Increase score by scoreIncrement
    score += scoreIncrement;
    console.log("Score: " + score);
    scoreElement.textContent = score.toString();
  }

  else if (snakebody.length > 0) {
    for (let i = snakebody.length - 1; i > 0; i--) {
      snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "green";
  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);
  for (let i = 0; i < snakebody.length; i++) {
    context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
  }

  if (snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize) {
    gameover = true;
    alert("Game over");
  }
  for (let i = 0; i < snakebody.length; i++) {
    if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
      gameover = true;
      alert("Game Over")
    }
  }
}

function changeDirection(e) {
  if (e.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function placefood() {
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * rows) * blocksize;
}

function restartGame() {
  // Reset score to 0
  score = 0;
  scoreElement.textContent = score.toString();

  // Clear the interval
  clearInterval(intervalid);
  
  // Clear the canvas
  context.clearRect(0, 0, board.width, board.height);
  
  // Reset game state
  snakeX = blocksize * 5;
  snakeY = blocksize * 5;
  snakebody = [];
  velocityX = 0;
  velocityY = 0;
  gameover = false;
  foodX = null;
  foodY = null;
  
  // Place new food
  placefood();
  
  // Restart the game loop
  intervalid = setInterval(update, 100);
}

restartButton.addEventListener("click", restartGame);
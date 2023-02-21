const cells = document.querySelectorAll(".cell");
const playerTurnDisplay = document.querySelector("#player-turn");
const winnerDisplay = document.querySelector("#winner");
const restartButton = document.querySelector("#restart");

let playerTurn = "X";
let gameOver = false;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

restartButton.addEventListener("click", restartGame);

function cellClicked(event) {
  const cell = event.target;

  if (cell.textContent !== "" || gameOver) {
    return;
  }

  cell.textContent = playerTurn;

  checkGameState();
}

function checkGameState() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (
      cells[a].textContent === playerTurn &&
      cells[b].textContent === playerTurn &&
      cells[c].textContent === playerTurn
    ) {
      winnerDisplay.textContent = `Player ${playerTurn} Wins!`;
      gameOver = true;
      return;
    }
  }

  let draw = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      draw = false;
      break;
    }
  }
  if (draw) {
    winnerDisplay.textContent = "Draw!";
    gameOver = true;
    return;
  }

  playerTurn = playerTurn === "X" ? "O" : "X";
  playerTurnDisplay.textContent = `Player ${playerTurn}'s Turn`;
}

function restartGame() {
  playerTurn = "X";
  gameOver = false;

  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }

  playerTurnDisplay.textContent = `Player ${playerTurn}'s Turn`;
  winnerDisplay.textContent = "";
}

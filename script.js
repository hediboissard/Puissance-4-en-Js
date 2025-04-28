var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var piece;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function () {
  setGame();
};

function setGame() {
  piece = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("piece").append(tile);
    }
    piece.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];

  if (r < 0) {
    return;
  }

  piece[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }

  r -= 1;
  currColumns[c] = r;

  checkWinner();
}

function checkWinner() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (piece[r][c] != " ") {
        if (
          piece[r][c] == piece[r][c + 1] &&
          piece[r][c + 1] == piece[r][c + 2] &&
          piece[r][c + 2] == piece[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (piece[r][c] != " ") {
        if (
          piece[r][c] == piece[r + 1][c] &&
          piece[r + 1][c] == piece[r + 2][c] &&
          piece[r + 2][c] == piece[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (piece[r][c] != " ") {
        if (
          piece[r][c] == piece[r + 1][c + 1] &&
          piece[r + 1][c + 1] == piece[r + 2][c + 2] &&
          piece[r + 2][c + 2] == piece[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (piece[r][c] != " ") {
        if (
          piece[r][c] == piece[r - 1][c + 1] &&
          piece[r - 1][c + 1] == piece[r - 2][c + 2] &&
          piece[r - 2][c + 2] == piece[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("gagnant");
  if (piece[r][c] == playerRed) {
    winner.innerText = "Les Rouges Gagnent";
  } else {
    winner.innerText = "Les jaunes Gagnent";
  }
  gameOver = true;
}

function setWinner(r, c) {
  let winnerText = piece[r][c] == playerRed ? "Les Rouges Gagnent" : "Les Jaunes Gagnent";
  showPopup(winnerText);
  gameOver = true;
}

function showPopup(message) {
  let popup = document.getElementById("popup");
  let overlay = document.getElementById("overlay");
  let winnerMessage = document.getElementById("popup-message");

  winnerMessage.innerText = message;
  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  let popup = document.getElementById("popup");
  let overlay = document.getElementById("overlay");

  popup.style.display = "none";
  overlay.style.display = "none";
  window.location.reload();
}
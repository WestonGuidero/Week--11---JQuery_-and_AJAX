var turn = document.getElementById("turn"),
boxes = document.querySelectorAll("#main div"), X_or_O = 0;

function selectWinnerBoxes(b1, b2, b3) {
  b1.classList.add("win");
  b2.classList.add("win");
  b3.classList.add("win");
  turn.innerHTML = b1.innerHTML + " is the winner";
  turn.style.fontSize = "40px";
  disableAllBoxes();
}

var hasWonPreviously = false;

function getWinner() {
  var box1 = document.getElementById("box1"),
      box2 = document.getElementById("box2"),
      box3 = document.getElementById("box3"),
      box4 = document.getElementById("box4"),
      box5 = document.getElementById("box5"),
      box6 = document.getElementById("box6"),
      box7 = document.getElementById("box7"),
      box8 = document.getElementById("box8"),
      box9 = document.getElementById("box9");

  if (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML)
    selectWinnerBoxes(box1, box2, box3);

  if (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML)
    selectWinnerBoxes(box4, box5, box6);

  if (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML)
    selectWinnerBoxes(box7, box8, box9);

  if (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML)
    selectWinnerBoxes(box1, box4, box7);

  if (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML)
    selectWinnerBoxes(box2, box5, box8);

  if (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML)
    selectWinnerBoxes(box3, box6, box9);

  if (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML)
    selectWinnerBoxes(box1, box5, box9);

  if (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
    selectWinnerBoxes(box3, box5, box7);

  return hasWonPreviously = document.querySelectorAll(".win").length > 0;
}

function checkForDraw() {
  var isDraw = true;
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw && !hasWonPreviously) {
    turn.innerHTML = "It's a draw!";
    turn.style.fontSize = "40px";
    turn.classList.add("alert", "alert-info");
    disableAllBoxes();
  }
}

function makeTurn() {
  if (this.innerHTML !== "X" && this.innerHTML !== "O" && !hasWonPreviously) {
    if (X_or_O % 2 === 0) {
      this.innerHTML = "X";
      turn.innerHTML = "O Turn Now";
    } else {
      this.innerHTML = "O";
      turn.innerHTML = "X Turn Now";
    }
    X_or_O += 1;

    var winner = getWinner();
    if (!winner) {
      checkForDraw();
    }
  }
}

function disableAllBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = null;
  }
}

for (var i = 0; i < boxes.length; i++) {
  boxes[i].onclick = makeTurn;
}

function resetGame() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].classList.remove("win");
    boxes[i].onclick = makeTurn;
  }
  turn.innerHTML = "Player X's turn";
  turn.style.fontSize = "20px";
  turn.classList.remove("alert", "alert-info");
  X_or_O = 0;
  hasWonPreviously = false;
}

var playAgainButton = document.getElementById("replay");
playAgainButton.addEventListener("click", resetGame);

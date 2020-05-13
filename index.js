const cards = document.querySelectorAll(".memory-card");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;
var tries = 0;
let rightAns = 0;
let totalMoves = 20;
let time = 45;
let gameWon = false;

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  if (lock) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  check();
}

function check() {
  var isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? succes() : fail();
  tries++;

  updateScoreBoard();
  if (rightAns === 8) {
    gameWon = true;
    showResult();
  }

  if (tries >= totalMoves) {
    showResult();
  }
}

function succes() {
  rightAns++;
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();
}

function fail() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showResult() {
  clearInterval(timerFunction);
  cards.forEach((card) => card.removeEventListener("click", flip));
  document.getElementById("time-result").innerHTML = "time's up";
  document.getElementById("final-result-card").classList.remove("no-display");
  document
    .getElementById("final-result-card")
    .classList.add(gameWon ? "winner-card" : "loser-card");
  document.getElementById("final-result").innerHTML = gameWon
    ? "Game won"
    : "Game Over!";
}

function updateScoreBoard() {
  console.log("Times tried", tries);
  console.log(rightAns);
  let triesPlace = document.getElementById("tries");
  let rightAnsPlace = document.getElementById("rightAns");
  let remMovePlace = document.getElementById("remMov");
  triesPlace.innerHTML = `${tries}`;
  rightAnsPlace.innerHTML = `${rightAns}`;
  remMovePlace.innerText = `${totalMoves - tries}`;
}

function timer() {
  time--;
  if (time === -1) {
    showResult();
    return;
  }
  document.getElementById("seconds-value").innerHTML = time;
}

const timerFunction = setInterval(timer, 1000);

(function shuffle() {
  cards.forEach((card) => {
    var pos = Math.floor(Math.random() * 16);
    card.style.order = pos;
  });
})();

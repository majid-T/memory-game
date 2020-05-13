const cards = document.querySelectorAll(".memory-card");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;

console.log("app started");

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  console.log(this);

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
}

function succes() {
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

(function shuffle() {
  cards.forEach((card) => {
    var pos = Math.floor(Math.random() * 16);
    card.style.order = pos;
  });
})();

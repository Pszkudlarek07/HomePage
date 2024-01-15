"use strict";

// Selecting elements
const gamer0Element = document.querySelector(".gamer--0");
const gamer1Element = document.querySelector(".gamer--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const diceElement = document.querySelector(".img-cls");
const buttonRestart = document.querySelector(".button--restart");
const buttonThrow = document.querySelector(".button--throw");
const buttonKeep = document.querySelector(".button--keep");
const buttonRules = document.querySelector(".button--rules");
const gamerName = document.querySelector(".gamer-name");
const winnerMessage1 = document.querySelector(".spn-class1");
const winnerMessage2 = document.querySelector(".spn-class2");

let results, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  results = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add("hidden");
  gamer0Element.classList.remove("gamer--winner");
  gamer1Element.classList.remove("gamer--winner");
  gamer0Element.classList.add("gamer--active");
  gamer1Element.classList.remove("gamer--active");
};
init();

// Switch Gamers functionality
const switchGamer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  gamer0Element.classList.toggle(`gamer--active`);
  gamer1Element.classList.toggle(`gamer--active`);
};

// button throwing  functionality

buttonThrow.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    // 3.Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchGamer();
    }
  }
});

// Button keep funcioniality

buttonKeep.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    results[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      results[activePlayer];

    // 2. Check if player's score is >= 100
    if (results[activePlayer] >= 100) {
      // Finish Game
      playing = false;
      diceElement.classList.add("hidden");

      document
        .querySelector(`.gamer--${activePlayer}`)
        .classList.add("gamer--winner");

      document
        .querySelector(`.gamer--${activePlayer}`)
        .classList.remove("hidden");

      document
        .querySelector(`.gamer--${activePlayer}`)
        .classList.remove("gamer--active");
    } else {
      // switch to the next player
      switchGamer();
    }
  }
});

// Button rules funcioniality
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const buttonCloseModal = document.querySelector(".close-modal");
const buttonOpenModal = document.querySelector(".button--rules");

const openModal = function () {
  modal.classList.remove("hidden-modal");
  overlay.classList.remove("hidden-overlay");
};

const closeModal = function () {
  modal.classList.add("hidden-modal");
  overlay.classList.add("hidden-overlay");
};

buttonOpenModal.addEventListener("click", openModal);
buttonCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Button restart funcioniality
buttonRestart.addEventListener("click", init);

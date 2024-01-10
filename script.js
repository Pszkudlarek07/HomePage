"use strict";

let anonymousNumber = Math.trunc(Math.random() * 25) + 1;
let score = 25;
let highscore = 0;
let gradient1 =
  "linear-gradient(to right, rgba(0, 146,69, 1), rgba(252, 238, 33, 1)";
let gradient2 =
  "linear-gradient(5deg, rgba(169, 241, 223, 1), rgba(255, 187, 187, 1))";

let displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// check button
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage("❌ No number! ❌");

    // When player wins
  } else if (guess === anonymousNumber) {
    displayMessage("");
    document.querySelector(".number").textContent = anonymousNumber;
    document.querySelector("body").style.backgroundImage = `${gradient1}`;
    document.querySelector("h1").textContent = "🎊 Correct Number! You won 🎊";
    document.querySelector("h1").style.fontSize = "6rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== anonymousNumber) {
    if (score > 1) {
      displayMessage(
        guess > anonymousNumber
          ? "Too high! try something lower 🔻"
          : "Too low! Try something higher 🔺"
      );
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("you lost the game ! try again 🔁");
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Reset button
document.querySelector(".again").addEventListener("click", function () {
  anonymousNumber = Math.trunc(Math.random() * 25) + 1;
  score = 25;
  document.querySelector(".score").textContent = 25;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundImage = `${gradient2}`;
  document.querySelector("h1").textContent = "Guess my number";
});

// Rules button

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".rules");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

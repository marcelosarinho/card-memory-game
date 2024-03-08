const htmlDocument = document.querySelector("html");
const themeButton = document.getElementById("theme-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const timerSeconds = document.getElementById("seconds");
const timerMinutes = document.getElementById("minutes");
const movesSpan = document.getElementById("moves");
const cards = document.querySelectorAll(".flip-container");
const mainDocument = document.querySelector("main");
const winParagraph = document.getElementById("win-text");
const winDialog = document.getElementById("win-dialog");
const cardsImages = document.querySelectorAll("div > img");
const closeButton = document.getElementById("close-button");
const closeIcon = document.getElementById("close-icon");

let timer = false;
let intervalID;
let seconds = 0;
let minutes = 0;
let flippedCards = [];
let moves = 0;
let hits = 0;
let lightIcon = `<svg
xmlns="http://www.w3.org/2000/svg"
width="30"
height="30"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="feather feather-sun dark:stroke-white"
>
<circle cx="12" cy="12" r="5"></circle>
<line x1="12" y1="1" x2="12" y2="3"></line>
<line x1="12" y1="21" x2="12" y2="23"></line>
<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
<line x1="1" y1="12" x2="3" y2="12"></line>
<line x1="21" y1="12" x2="23" y2="12"></line>
<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>`;

let darkIcon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-moon dark:stroke-white"
>
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`;

function reset() {
  seconds = 0;
  minutes = 0;
  moves = 0;
  hits = 0;

  timerSeconds.innerText = ("0" + seconds).slice(-2);
  timerMinutes.innerText = ("0" + minutes).slice(-2);
  movesSpan.innerText = ("0" + moves).slice(-2);

  cards.forEach((card) => card.classList.remove("pointer-events-none"));
}

function shuffleIcons() {
  let images = [
    "box.svg",
    "box.svg",
    "briefcase.svg",
    "briefcase.svg",
    "camera.svg",
    "camera.svg",
    "cpu.svg",
    "cpu.svg",
    "database.svg",
    "database.svg",
    "dollar-sign.svg",
    "dollar-sign.svg",
    "droplet.svg",
    "droplet.svg",
    "gift.svg",
    "gift.svg",
  ];

  let currentIndex = images.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [images[currentIndex], images[randomIndex]] = [
      images[randomIndex],
      images[currentIndex],
    ];
  }

  cardsImages.forEach((cardImage, index) => {
    cardImage.src = `assets/${images[index]}`;
  });
}

function closeWinMessage() {
  winDialog.classList.add("hidden");
  mainDocument.classList.add("pointer-events-none");
  resetButton.setAttribute("disabled", "");
  startButton.innerText = "Começar";
  cards.forEach((card) => card.firstElementChild.classList.remove("flip-card"));
}

function winMessage() {
  winParagraph.innerText = `Foram necessárias ${movesSpan.innerText} tentativas, em ${timerMinutes.innerText} minuto(s) e ${timerSeconds.innerText} segundo(s).`;
  winDialog.classList.remove("hidden");

  reset();

  clearInterval(intervalID);
}

function addMoves() {
  moves++;
  movesSpan.innerText = ("0" + moves).slice(-2);
}

function extractIconName(url) {
  let icon = url.split("/");
  icon = icon[icon.length - 1];
  return icon.replace(".svg", "");
}

function verifyCards(cardsToBeVerified) {
  let icons = [];

  cardsToBeVerified.forEach((flippedCard) => {
    icons.push(flippedCard.children[1].children[0].src);
  });

  if (extractIconName(icons[0]) !== extractIconName(icons[1])) {
    setTimeout(() => {
      cardsToBeVerified.forEach((flippedCard) => {
        flippedCard.classList.remove("flip-card");
        flippedCard.parentElement.classList.remove("pointer-events-none");
      });
    }, 750);
  } else {
    hits++;
  }

  flippedCards = [];

  addMoves();

  if (hits === 8) winMessage();
}

function flipCard(card) {
  card.firstElementChild.classList.add("flip-card");
  card.classList.add("pointer-events-none");
  flippedCards.push(card.firstElementChild);

  if (flippedCards.length === 2) {
    verifyCards(flippedCards);
  }
}

function toggleTheme() {
  htmlDocument.classList.toggle("dark");

  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
    themeButton.innerHTML = darkIcon;

    return;
  }

  localStorage.setItem("theme", "dark");
  themeButton.innerHTML = lightIcon;
}

function resetTimer() {
  timer = false;
  mainDocument.classList.add("pointer-events-none");
  resetButton.setAttribute("disabled", "");
  startButton.innerText = "Começar";
  cards.forEach((card) => card.firstElementChild.classList.remove("flip-card"));

  clearInterval(intervalID);
}

function toggleTimer() {
  timer = !timer;

  if (timer) {
    resetButton.removeAttribute("disabled");
    mainDocument.classList.remove("pointer-events-none");
    startButton.innerText = "Parar";

    intervalID = setInterval(() => {
      seconds += 1;
      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
        timerMinutes.innerText = ("0" + minutes).slice(-2);
      }
      timerSeconds.innerText = ("0" + seconds).slice(-2);
    }, 1000);
  } else {
    startButton.innerText = "Começar";
    mainDocument.classList.add("pointer-events-none");
    clearInterval(intervalID);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  shuffleIcons();

  if (localStorage.getItem("theme") === "dark") {
    htmlDocument.classList.add("dark");
    themeButton.innerHTML = lightIcon;

    return;
  }

  themeButton.innerHTML = darkIcon;
});

startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", reset);
closeButton.addEventListener("click", closeWinMessage);
closeIcon.addEventListener("click", closeWinMessage);
themeButton.addEventListener("click", toggleTheme);

cards.forEach((card) => card.addEventListener("click", () => flipCard(card)));

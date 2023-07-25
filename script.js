'use strict';

let currentPlayer = 0;
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let playing = true;

let scores = [0, 0];
let currentScore = 0;
let diceNumber = Math.trunc(Math.random() * 6) + 1;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`);
  currentPlayer = currentPlayer ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// user rolls dice
btnRoll.addEventListener('click', function () {
  // generate random dice roll
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    // display dice roll
    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    //is it 1?
    if (diceNumber === 1) {
      //switch player
      document.getElementById(`current--${currentPlayer}`).textContent = 0;
      currentScore = 0;
      switchPlayer();
    } else {
      // add to current score
      currentScore += diceNumber;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    }
  }
});

// user holds
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      // end game
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    } else {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  currentPlayer = 0;
  currentScore = 0;
  console.log(currentScore);
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  playing = true;
  scores = [0, 0];
});

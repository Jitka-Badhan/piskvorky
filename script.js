'use strict';

const boardSize = 10;
const fields = document.querySelectorAll('button');
const symbolsToWin = 5;
let player = 'circle';

const drawCrossOrCircle = (event) => {
  const selectedButton = event.target;
  const playerIcon = document.querySelector('.play__nav__player > img');

  if (player === 'circle') {
    selectedButton.classList.add('board__field--circle');
    selectedButton.disabled = true;
    if (isWinningMove(selectedButton)) {
      setTimeout(() => {
        const end = confirm(`Vyhrálo kolečko. Spustit novou hru?`);
        if (end) {
          location.reload();
        }
      }, 300);
    } else {
      player = 'cross';
      playerIcon.setAttribute('src', 'img/cross.svg');
    }
  } else if (player === 'cross') {
    selectedButton.classList.add('board__field--cross');
    selectedButton.disabled = true;
    if (isWinningMove(selectedButton)) {
      setTimeout(() => {
        const end = confirm(`Vyhrál křížek. Spustit novou hru?`);
        if (end) {
          location.reload();
        }
      }, 300);
    } else {
      player = 'circle';
      playerIcon.setAttribute('src', 'img/circle.svg');
    }
  } else {
    console.log('Error inside function drawCrossOrCircle');
  }
};

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  // Diagonály

  let y;

  let inDiagonalA = 1;
  // Koukni nahoru vpravo
  i = origin.row;
  y = origin.column;
  while (
    i > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i - 1, y + 1))
  ) {
    inDiagonalA++;
    i--;
    y++;
  }

  // Koukni dolu vlevo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(i + 1, y - 1))
  ) {
    inDiagonalA++;
    i++;
    y--;
  }

  if (inDiagonalA >= symbolsToWin) {
    return true;
  }

  let inDiagonalB = 1;
  // Koukni nahoru vlevo
  i = origin.row;
  y = origin.column;
  while (i > 0 && y > 0 && symbol === getSymbol(getField(i - 1, y - 1))) {
    inDiagonalB++;
    i--;
    y--;
  }

  // Koukni dolu vpravo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, y + 1))
  ) {
    inDiagonalB++;
    i++;
    y++;
  }

  if (inDiagonalB >= symbolsToWin) {
    return true;
  }

  return false;
};

fields.forEach((item) => {
  item.addEventListener('click', drawCrossOrCircle);
});

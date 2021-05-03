'use strict';

let player = 'circle';
let fields = [];

const gameGoesOn = (button, index) => {
  // Function that associates each button with a field in the array of fields, provides it with info about its location on the board and whether it is empty
  const defineField = (index) => {
    const indexStr = String(index).padStart(2, 0);
    const field = {
      row: Number(indexStr.slice(0, 1)),
      column: Number(indexStr.slice(1)),
      symbol: 'undefined',
    };
    return field;
  };

  // Function of the eventListener (on each button)
  const drawCrossOrCircle = (event) => {
    const selectedButton = event.target;
    const playerIcon = document.querySelector('.play__nav__player > img');

    // 1. Draw the symbol on the board
    // 2. Calculate if there are more same symbols & find out the moment of the game over
    // 3. If the game goes on, change the player
    if (player === 'circle') {
      selectedButton.classList.add('board__field--circle');
      selectedButton.disabled = true;

      fields[index].symbol = 'circle';
      isGameOver(isWinningMove(index));

      player = 'cross';
      playerIcon.setAttribute('src', 'img/cross.svg');
    } else if (player === 'cross') {
      selectedButton.classList.add('board__field--cross');
      selectedButton.disabled = true;

      fields[index].symbol = 'cross';
      isGameOver(isWinningMove(index));

      player = 'circle';
      playerIcon.setAttribute('src', 'img/circle.svg');
    } else {
      console.log('Error inside the event listener');
    }
  };

  // Function to find the 5 same symbols in the row/column (returns true or false)
  const isWinningMove = (index) => {
    const thisField = fields[index];
    const thisFieldIndex = index;

    // One point for the current symbol
    let sameSymbolsInRow = 1;
    let sameSymbolsInColumn = 1;

    // Research of the same symbols on the right
    if (thisFieldIndex < 99) {
      let moveRight = thisFieldIndex + 1;
      while (
        thisField.symbol === fields[moveRight].symbol &&
        thisField.row === fields[moveRight].row
      ) {
        sameSymbolsInRow++;
        moveRight++;
      }
    }

    // Research of the same symbols on the left
    if (thisFieldIndex > 0) {
      let moveLeft = thisFieldIndex - 1;
      while (
        thisField.symbol === fields[moveLeft].symbol &&
        thisField.row === fields[moveLeft].row
      ) {
        sameSymbolsInRow++;
        moveLeft--;
      }
    }

    // Research of the same symbols above the current one
    if (thisFieldIndex > 10) {
      let moveUp = thisFieldIndex - 10;
      while (
        thisField.symbol === fields[moveUp].symbol &&
        thisField.column === fields[moveUp].column
      ) {
        sameSymbolsInColumn++;
        moveUp -= 10;
      }
    }

    // Research of the same symbols beneath the current one
    if (thisFieldIndex < 90) {
      let moveDown = thisFieldIndex + 10;
      while (
        thisField.symbol === fields[moveDown].symbol &&
        thisField.column === fields[moveDown].column
      ) {
        sameSymbolsInColumn++;
        moveDown += 10;
      }
    }

    // The final result
    if (sameSymbolsInRow >= 5 || sameSymbolsInColumn >= 5) {
      return true;
    } else return false;
  };

  // Function to end the game
  const isGameOver = (fiveCrossesOrCircles) => {
    if (fiveCrossesOrCircles) {
      setInterval(() => {
        alert('Vyhrál ' + player);
      }, 300);
    }
  };

  fields.push(defineField(index));
  button.addEventListener('click', drawCrossOrCircle);
};

document.querySelectorAll('button').forEach(gameGoesOn);

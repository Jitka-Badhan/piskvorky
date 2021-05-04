'use strict';

let player = 'circle';
let fields = [];

const gameGoesOn = (button, index) => {
  // Function that associates each button with a 'field' in the array of fields, provides it with info about its location and symbol
  const defineField = (index) => {
    const indexStr = String(index).padStart(2, 0);
    const field = {
      row: Number(indexStr.slice(0, 1)),
      column: Number(indexStr.slice(1)),
      symbol: 'undefined',
    };
    return field;
  };

  // Function of the eventListener (later added to each button)
  const drawCrossOrCircle = (event) => {
    const selectedButton = event.target;
    const playerIcon = document.querySelector('.play__nav__player > img');
    const symbol = player;

    // 1. Draw the symbol on the board
    selectedButton.classList.add(`board__field--${symbol}`);
    selectedButton.disabled = true;
    // 2. Check if there are more same symbols (if yes, end the game)
    fields[index].symbol = `${symbol}`;
    if (isWinningMove(index)) {
      gameOver();
    } else {
      // 3. If the game continues, change the player
      symbol === 'circle' ? (player = 'cross') : (player = 'circle');
      playerIcon.setAttribute('src', `img/${player}.svg`);
    }
  };

  // Function to find the 5 same symbols in the row/column/diagonals (returns true or false)
  const isWinningMove = (index) => {
    const thisField = fields[index];
    const thisFieldIndex = index;

    const finalScore = 5;

    const checkRow = () => {
      let sameSymbols = 1;
      let shift;

      // Check on the right
      if (thisFieldIndex < 99) {
        shift = 1;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          thisField.row === fields[thisFieldIndex + shift].row &&
          thisFieldIndex + shift < 99
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift++;
          }
        }
      }

      // Check on the left
      if (thisFieldIndex > 0) {
        shift = -1;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          thisField.row === fields[thisFieldIndex + shift].row &&
          thisFieldIndex + shift > 0
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift--;
          }
        }
      }

      return false;
    };

    const checkColumn = () => {
      let sameSymbols = 1;
      let shift;

      // Check above
      if (thisFieldIndex > 10) {
        shift = -10;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          thisField.column === fields[thisFieldIndex + shift].column &&
          thisFieldIndex + shift > 10
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift -= 10;
          }
        }
      }

      // Check below
      if (thisFieldIndex < 90) {
        shift = 10;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          thisField.column === fields[thisFieldIndex + shift].column &&
          thisFieldIndex + shift < 90
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift += 10;
          }
        }
      }

      return false;
    };

    const checkDiagonal1 = () => {
      let sameSymbols = 1;
      let shift;

      // Check the right down
      if (thisField.row < 9 && thisField.column < 9) {
        shift = 11;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          fields[thisFieldIndex + shift].row < 9 &&
          fields[thisFieldIndex + shift].column < 9
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift += 11;
          }
        }
      }

      // Check the left up
      if (thisField.row > 0 && thisField.column > 0) {
        shift = -11;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          fields[thisFieldIndex + shift].row > 0 &&
          fields[thisFieldIndex + shift].column > 0
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift += -11;
          }
        }
      }

      return false;
    };

    const checkDiagonal2 = () => {
      let sameSymbols = 1;
      let shift;

      // Check the left down
      if (thisField.row < 9 && thisField.column > 0) {
        shift = 9;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          fields[thisFieldIndex + shift].row < 9 &&
          fields[thisFieldIndex + shift].column > 0
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift += 9;
          }
        }
      }

      // Check the right up
      if (thisField.row > 0 && thisField.column < 9) {
        shift = -9;

        while (
          thisField.symbol === fields[thisFieldIndex + shift].symbol &&
          fields[thisFieldIndex + shift].row > 0 &&
          fields[thisFieldIndex + shift].column < 9
        ) {
          sameSymbols++;
          if (sameSymbols === finalScore) {
            return true;
          } else {
            shift += -9;
          }
        }
      }

      return false;
    };

    if (checkRow() || checkColumn() || checkDiagonal1() || checkDiagonal2()) {
      return true;
    } else {
      return false;
    }
  };

  // Function to show the winner and reload option
  const gameOver = () => {
    setTimeout(() => {
      let winner = '';
      player === 'circle' ? (winner = 'kroužek') : (winner = 'křížek');
      const reload = confirm(`Vyhrál ${winner}. Spustit novou hru?`);
      if (reload) {
        location.reload();
      }
    }, 300);
  };

  fields.push(defineField(index));
  button.addEventListener('click', drawCrossOrCircle);
};

document.querySelectorAll('button').forEach(gameGoesOn);

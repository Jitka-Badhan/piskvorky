'use strict';

let player = 'circle';

const drawCrossOrCircle = (event) => {
  const selectedButton = event.target;
  const playerIcon = document.querySelector('.play__nav__player > img');

  if (player === 'circle') {
    selectedButton.classList.add('board__field--circle');
    selectedButton.disabled = true;
    player = 'cross';
    playerIcon.setAttribute('src', 'img/cross.svg');
  } else if (player === 'cross') {
    selectedButton.classList.add('board__field--cross');
    selectedButton.disabled = true;
    player = 'circle';
    playerIcon.setAttribute('src', 'img/circle.svg');
  } else {
    console.log('Error inside function drawCrossOrCircle');
  }
};

document.querySelectorAll('button').forEach((item) => {
  item.addEventListener('click', drawCrossOrCircle);
});

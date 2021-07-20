// SETUP:

const squareSize = 30;
const lineSize = 1;
const placeSize = (squareSize + lineSize); // (squareSize+lineSize)

function boardLayoutSetUp() {
  const board = document.querySelector('.board-container');

  // start squares
  for (let i = 0; i < 4; i++) {
    const startArea = document.createElement('div');
    let rollingClassName = 'player-' + (i + 1);
    startArea.classList.add('start-area');
    startArea.classList.add(rollingClassName);
    startArea.style.width = (squareSize * 4) + (lineSize * 5) + 'px';
    startArea.style.height = (squareSize * 4) + (lineSize * 5) + 'px';
    for (let i = 0; i < 4; i++) {
      let startAreaSquare = document.createElement('div');
      let rollingClassName2 = 'start-area-square-' + (i + 1);
      startAreaSquare.classList.add('start-area-square');
      startAreaSquare.classList.add(rollingClassName2);
      startAreaSquare.style.width = squareSize + 'px';
      startAreaSquare.style.height = squareSize + 'px';
      startAreaSquare.style.border = lineSize + 'px solid black';
      startAreaSquare.style.left = placeSize * (i==0||i==3 ? 0.5 : 2.5) + 'px';
      startAreaSquare.style.top = placeSize * (i==0||i==1 ? 0.5 : 2.5) + 'px';
      startArea.appendChild(startAreaSquare);
    }
    board.appendChild(startArea);
  }

  // main play squares
  for (let i = 0; i < 64; i++) {
    const playSquare = document.createElement('div');
    playSquare.classList.add('play-square');
    if (i == 0 || i == 16 || i == 32 || i == 48) {
      playSquare.classList.add('start-square');
    }
    playSquare.style.width = squareSize + 'px';
    playSquare.style.height = squareSize + 'px';
    playSquare.style.border = lineSize + 'px solid black';
    let startAreaSize = (squareSize + lineSize) * 4;
    if (i < 9) {
      playSquare.style.left = startAreaSize + (i * (squareSize + lineSize)) + 'px';
    } else if (i < 13) {
      playSquare.style.left = startAreaSize + (8 * (squareSize + lineSize)) + 'px';
      playSquare.style.top = 0 + ((i-8) * (squareSize + lineSize)) + 'px';
    } else if (i < 17) {
      playSquare.style.left = startAreaSize + ((i-4) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = 0 + ((4) * (squareSize + lineSize)) + 'px';
    } else if (i < 25) {
      playSquare.style.left = startAreaSize + ((12) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = 0 + ((i-12) * (squareSize + lineSize)) + 'px';
    } else if (i < 29) {
      playSquare.style.left = ((40-i) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = 0 + ((12) * (squareSize + lineSize)) + 'px';
    } else if (i < 33) {
      playSquare.style.left = ((12) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = 0 + ((i - 16) * (squareSize + lineSize)) + 'px';
    } else if (i < 41) {
      playSquare.style.left = ((44-i) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((16) * (squareSize + lineSize)) + 'px';
    } else if (i < 45) {
      playSquare.style.left = ((4) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((56-i) * (squareSize + lineSize)) + 'px';
    } else if (i < 49) {
      playSquare.style.left = ((48-i) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((12) * (squareSize + lineSize)) + 'px';
    } else if (i < 57) {
      playSquare.style.left = ((0) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((60-i) * (squareSize + lineSize)) + 'px';
    } else if (i < 61) {
      playSquare.style.left = ((i-56) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((4) * (squareSize + lineSize)) + 'px';
    } else {
      playSquare.style.left = ((4) * (squareSize + lineSize)) + 'px';
      playSquare.style.top = ((64-i) * (squareSize + lineSize)) + 'px';
    }
    board.appendChild(playSquare);
  }

  // home squares
  for (let i = 0; i < 4; i++) {
    let rollingClassName = 'player-' + (i + 1);
    for (let j = 0; j < 4; j++) {
        let homeSquare = document.createElement('div');
        homeSquare.classList.add('home-square');
        let rollingClassName2 = 'home-square-' + (4-j);
        homeSquare.classList.add(rollingClassName);
        homeSquare.classList.add(rollingClassName2);
        homeSquare.style.border = lineSize + 'px solid black';
        homeSquare.style.width = squareSize + 'px';
        homeSquare.style.height = squareSize + 'px';

        if (i==1 || i==3) {
          homeSquare.style.left = 8 * (squareSize + lineSize) + 'px';
        } else if (i == 0) {
          homeSquare.style.left = ((j+1) * (squareSize + lineSize)) + 'px';
        } else {
          homeSquare.style.left = ((15-j) * (squareSize + lineSize)) + 'px';
        }
        if (i==0 || i==2) {
          homeSquare.style.top = 8 * (squareSize + lineSize) + 'px';
        } else if (i == 1) {
          homeSquare.style.top = ((j+1) * (squareSize + lineSize)) + 'px';
        } else {
          homeSquare.style.top = ((15-j) * (squareSize + lineSize)) + 'px';
        }

        board.appendChild(homeSquare);
    }
  }
}

boardLayoutSetUp();

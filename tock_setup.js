// SETUP:

const squareSize = 30;
const lineSize = 1;
const placeSize = (squareSize + lineSize); // (squareSize+lineSize)

let squaresDOM = {play : [],
              start : [[],[],[],[]],
              home : [[],[],[],[]]};


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
    for (let j = 0; j < 4; j++) {
      let startAreaSquare = document.createElement('div');
      let rollingClassName2 = 'start-area-square-' + (i + 1);
      startAreaSquare.classList.add('start-area-square');
      startAreaSquare.classList.add(rollingClassName2);
      startAreaSquare.style.width = squareSize + 'px';
      startAreaSquare.style.height = squareSize + 'px';
      startAreaSquare.style.border = lineSize + 'px solid black';
      startAreaSquare.style.left = placeSize * (j==0||j==3 ? 0.5 : 2.5) + 'px';
      startAreaSquare.style.top = placeSize * (j==0||j==1 ? 0.5 : 2.5) + 'px';
      startArea.appendChild(startAreaSquare);
      squaresDOM.start[i].push(startAreaSquare);
    }
    let startAreaLabel = document.createElement('div');
    startAreaLabel.classList.add('start-area-label');
    startAreaLabel.classList.add(rollingClassName);
    startArea.appendChild(startAreaLabel);
    let playerHand = document.createElement('div');
    playerHand.classList.add('player-hand');
    playerHand.classList.add(rollingClassName);
    if (i==0) {playerHand.classList.add('user');}
    i == 0 || i == 3 ? playerHand.style.bottom = 175 : playerHand.style.top = 175;
    i == 0 || i == 1 ? playerHand.style.left = 50 : playerHand.style.right = 50;
    board.appendChild(playerHand);
    board.appendChild(startArea);
  }

  // main play squares
  let runningLeftTop = [placeSize * 4, placeSize * 16];
  for (let i = 0; i < 64; i++) {
    const playSquare = document.createElement('div');
    playSquare.innerHTML = i;
    playSquare.classList.add('play-square');
    if (i == 0 || i == 16 || i == 32 || i == 48) {
      playSquare.classList.add('start-square');
    }
    playSquare.style.width = squareSize + 'px';
    playSquare.style.height = squareSize + 'px';
    playSquare.style.border = lineSize + 'px solid black';
    let startAreaSize = (squareSize + lineSize) * 4;

    playSquare.style.left = runningLeftTop[0];
    playSquare.style.top = runningLeftTop[1];
    if (i < 4 || (i < 16 && i >= 8) || (i >=20 && i < 24)) {
      runningLeftTop[1] -= placeSize;
    } else if (i < 8 || (i>=48 && i<52) || (i>=56 && i<63)) {
      runningLeftTop[0] -= placeSize;
    } else if (i < 20 || (i >= 24 && i < 32) || (i >= 36 && i < 40)) {
      runningLeftTop[0] += placeSize;
    } else if (i < 36 || (i >=40 && i < 48) || (i>=52 && i<56)) {
      runningLeftTop[1] += placeSize;
    }

    squaresDOM.play.push(playSquare);
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

        if (i==0 || i==2) { //top and bottom
          homeSquare.style.left = 8 * (squareSize + lineSize) + 'px';
        } else if (i == 1) { //left
          homeSquare.style.left = ((j+1) * (squareSize + lineSize)) + 'px';
        } else { //right
          homeSquare.style.left = ((15-j) * (squareSize + lineSize)) + 'px';
        }
        if (i==1 || i==3) { // left and right
          homeSquare.style.top = 8 * (squareSize + lineSize) + 'px';
        } else if (i == 2) { // top
          homeSquare.style.top = ((j+1) * (squareSize + lineSize)) + 'px';
        } else { // bottom
          homeSquare.style.top = ((15-j) * (squareSize + lineSize)) + 'px';
        }

        board.appendChild(homeSquare);
        squaresDOM.home[i].push(homeSquare);
    }
  }
}

boardLayoutSetUp();

const pieceSize = 26;
let dealer = 1;

document.querySelectorAll('.start-area-label')[dealer-1].classList.add('dealer');

//so the 'boardState' will hold info and the player(hand)/card/piece object FacFuncs will create the elements for each player in their dom

let boardState = {
  // players : { player1 : '',
  //           }
  dealer : 1,
  deck : [],
  player1 : { name : "",
              hand : [],
              counters : [-14, -13, -12, -11]},
  player2 : { name : "",
              hand : [],
              counters : [-24, -23, -22, -21]},
  player3 : { name : "",
              hand : [],
              counters : [-34, -33, -32, -31]},
  player4 : { name : "",
              hand : [],
              counters : [-44, -43, -42, -41]}
}

// spaces: 0,1,2,3,4, 5,6,7,8, 9,10,11,12...;
// p1: 12       p2 28     p3 44       p4 60
// start: -11,-12,-13,-14     -31,-32 -41,-42
// home: 112    228       344         460


const Player = (name, number, human) => {
  const getName = () => name;
  let hand = [];
  const addToHand = (card) => {
    hand.push(card);
  }
  const selectCard = (card) => {
    // if card
    console.log('card: ' + card.getCard());
  }
  const cardClick = (card) => {
    // console.log(card);
    if (event.target.classList.contains('shown') == false) {
      card.showCard(card);
    } else {
      selectCard(card);
    }
  }
  const handClickInit = () => {
    hand.forEach(card => {
      card.alias.addEventListener('click', function(event){cardClick(card)}, false);
    });
  }

  return {getName, name, addToHand, hand, handClickInit};
}

// this just sets up for TESTING
let players = [];
for (let i=0; i<4; i++) {
  let playerName = 'Player ' + (i+1);
  players.push(Player(playerName, (i+1)));
  document.querySelectorAll('.start-area-label')[i].innerHTML = playerName;
}
// console.log(players);

const Piece = (player, number) => {
  // const create
  let alias = undefined;
  const move = () => {};

  return {move, alias};
}

let pieces = [[],[],[],[]];

for (let i = 0; i < 4; i++) {

  let rollingClassName = 'player-' + (i+1);

  for (let j = 0; j < 4; j++) {
    let piece = Piece((i+1),j);
    let alias = document.createElement('div');

    if (i == 2 || i == 3) {
      alias.innerHTML = '<svg height="30" width="30"><path class="p34fill"></path><path class="p34stroke"></path></svg>';
    } else { alias.innerHTML = '<svg height="30" width="30"><path></path></svg>';}

    alias.classList.add('counter');
    alias.classList.add(rollingClassName);
    piece.alias = alias;
    pieces[i].push(piece);
    squaresDOM.start[i][j].appendChild(piece.alias);
  }
}

console.log(pieces);

const Space = () => {

}

let squares = { play : [],
                start : [[],[],[],[]],
                home : [[],[],[],[]]
                };



const Card = (suite, value) => {
  const rank = value == 1 ? 'Ace' : value == 11 ? 'Jack' : value == 12 ? 'Queen' : value == 13 ? 'King' : value;
  getCard = () => rank + ' of ' + suite;
  card = rank + ' of ' + suite;
  //for 8BitDeck.png
  //back is 00, 2 is x-35, 3 is x-70, etc
  //hearts y0, clubs y-47, diamond y-94, spades y-141
  let imageXY = [0,0];
  let alias = undefined;

  // cardImage = () => {
  //   y = suite == 'Hearts' ? 0 : suite == 'Clubs' ? -47 : suite == 'Diamonds' ? -94 : -141;
  // }
  imageXY[1] = suite == 'Hearts' ? 0 : suite == 'Clubs' ? -47 : suite == 'Diamonds' ? -94 : -141;
  imageXY[0] = ((value==1?14:value) - 1) * -35;
  const showCard = (card) => {
    card.alias.style.backgroundPosition = imageXY[0] + 'px ' + imageXY[1] + 'px';
    card.alias.classList.add('shown');
  }
  return {getCard, card, imageXY, alias, showCard};
}



const deck = (() => {
  let suites = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
  let stack = [];
  const init = () => {
    for (let i=0; i<4; i++) {
      for (let j=1; j<14; j++) {
        let card = Card(suites[i],j);
        stack.push(card);

        let alias = document.createElement('div');
        alias.classList.add('card');
        // alias.style.top = (52-(j*i+1))*2;
        card.alias = alias;
        // cardsContainer.appendChild(alias);
        // console.log(card.getCard());
      }
    }
    // console.log(stack);
  };
  const shuffle = () => {
    for (let i=0; i<stack.length; i++) {
      let active = stack.pop(); //shift is first, pop is last
      stack.splice((Math.floor(Math.random()*52)+1), 0, active);
    }
    // console.log(stack);
  }
  const stackUp = () => {
    for (let i=0; i < deck.stack.length; i++) {


      deck.stack[i].alias.style.top = (52-i)*2; // (52-i)*2 from top or -i*2 from bottom
      cardsContainer.appendChild(deck.stack[i].alias);

    }
  }
  const deal = () => {
    let playerLooper = 0;
    for (let i = 0; i < (stack.length == 20 ? 20 : 16); i++) {
      // setTimeout(function() {
        let dealtCard = stack.pop();
        let dealtAlias = cardsContainer.removeChild(dealtCard.alias);
        dealtAlias.style.top = 0;
        players[playerLooper].addToHand(dealtCard); //adds to array
        playerHands[playerLooper].appendChild(dealtAlias); // adds to dom
        playerLooper == 3 ? playerLooper = 0 : playerLooper++;
      // },50 * i);
    }
    dealer = dealer == 4 ? 1 : dealer + 1;
    console.log(players[1].hand);
    players[0].handClickInit();
  }
  return {init, shuffle, deal, stackUp,
      stack};
})();

const cardsContainer = document.querySelector('.cards');
const playerHands = document.querySelectorAll('.player-hand');


deck.init();
deck.shuffle();
deck.stackUp();

deck.deal();

console.log(deck.stack);

// console.log(squaresDOM.home[1]);

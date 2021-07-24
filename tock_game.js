const pieceSize = 26;
let dealer = 1;


const Player = (name, number) => {
  const getName = () => name;
  let hand = [];
  const addToHand = (card) => {
    hand.push(card);
  }
  const cardClick = (card) => {
    console.log(card);
    if (event.target.classList.contains('shown')!=true) {
      card.showCard(card);
    }
  }
  const handClickInit = () => {
    hand.forEach(card => {
      card.alias.addEventListener('click', function(event){cardClick(card)}, false);
    });
    console.log('summin');
  }

  return {getName, name, addToHand, hand, handClickInit};
}

let players = [];
for (let i=0; i<4; i++) {
  let playerName = 'Player ' + (i+1);
  players.push(Player(playerName, (i+1)));
  document.querySelectorAll('.start-area-label')[i].innerHTML = playerName;
}
// console.log(players);

const Piece = (player, number) => {
  const move = () => {};

  return {move};
}

const Space = () => {

}

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
  }
  return {getCard, card, imageXY, alias, showCard};
}


// let deck = [];
// let suites = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
//
// for (let i=0; i<4; i++) {
//   for (let j=1; j<14; j++) {
//     let card = Card(suites[i],j);
//     deck.push(card);
//     console.log(card.getCard());
//   }
// } console.log(deck.length);
//
// const cardsContainer = document.querySelector('.cards');
//
// for (let i=0; i < deck.length; i++) {
//   let card = document.createElement('div');
//   card.classList.add('card');
//   card.style.top = (52-i)*2;
//   cardsContainer.appendChild(card);
// }

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
    } console.log(stack);
  };
  const shuffle = () => {
    for (let i=0; i<stack.length; i++) {
      let active = stack.pop(); //shift is first, pop is last
      stack.splice((Math.floor(Math.random()*52)+1), 0, active);
    } console.log(stack);
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
      let dealtCard = stack.pop();
      let dealtAlias = cardsContainer.removeChild(dealtCard.alias);
      dealtAlias.style.top = 0;
      players[playerLooper].addToHand(dealtCard); //adds to array
      playerHands[playerLooper].appendChild(dealtAlias); // adds to dom
      playerLooper == 3 ? playerLooper = 0 : playerLooper++;
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

// for (let i=0; i < deck.stack.length; i++) {
//   let card = document.createElement('div');
//   card.classList.add('card');
//   card.style.top = (52-i)*2; // (52-i)*2 from top or -i*2 from bottom
//   cardsContainer.appendChild(card);
// }
deck.deal();

// console.log(deck.stack[0]);
// console.log(playerHands)

// console.log(Math.floor(Math.random()*52));

// const test = Card('Diamonds', 15);

// console.log(deck[12].xy + ': ' + deck[12].getCard());

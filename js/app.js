/*
 * Create a list that holds all of your cards
 */

const eachCard = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// add each card's HTML to the page
function createCard(cardClass) {
    const cardLi = document.createElement('li');
    cardLi.setAttribute('class', 'card');
    const cardI = document.createElement('i');
    cardI.setAttribute('class', cardClass);
    const deck = document.querySelector('.deck');

    deck.appendChild(cardLi);
    cardLi.appendChild(cardI);
}

function makeGrid() {
    shuffle(eachCard).forEach(createCard);
}

// event listener when DOM loaded make grid of cards
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    makeGrid();
  });

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // empty array for open cards which will check for matching pairs
let openCards = [];

// event listener for fliping cards /* event delegation */
const deck = document.querySelector('.deck');
deck.addEventListener('click', openShow); 


// toggle classes open & show
// add cards to openCards
function openShow(e) {
if(e.target.nodeName === 'LI') {      
       e.target.classList.toggle('open');
       e.target.classList.toggle('show');
       openCards.push(e.target);
       console.log(openCards);
       checkLength();
   }
}

// if 2 cards open, check if match
function checkLength() {
    if(openCards.length === 2) {
        checkIfMatch();
    }
}

// event listener for end of animation
deck.addEventListener('animationend', onEnd);

// remove classes after animation
function onEnd(e) {
    if(e.target.nodeName === 'LI') {
        e.target.classList.remove('open');
        e.target.classList.remove('show');
        e.target.classList.remove('shake');
    }
};

// if cards have same class add add animation and match class
// else add animation for no match
// reset openCards for new check
function checkIfMatch() {
    if(openCards[0].firstChild.className === openCards[1].firstChild.className) {
        console.log("match");
        openCards[0].classList.add("tada");
        openCards[1].classList.add("tada");
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
    } else {
        console.log("no match");
        openCards[0].classList.toggle("shake");
        openCards[1].classList.toggle("shake");
    } 
    openCards = [];
}


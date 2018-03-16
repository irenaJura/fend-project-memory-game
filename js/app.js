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

//pairs variable starts at 0
let pairs = 0;

// number of moves user makes
let moves = 0;

// couter variables
let counter = 0;
let counterOn = 0;
let t;

// stars variables for manipulation 
let stars = document.querySelector('.stars'); // Get the list whose class is stars.
let elements = stars.getElementsByTagName('li'); // Get HTMLCollection of elements with the li tag name.

// event listener for fliping cards /* event delegation */
const deck = document.querySelector('.deck');
deck.addEventListener('click', openShow); 

// counterOn set to true(1), starts counting
// toggle classes open & show
// add cards to openCards
function openShow(e) {
    if(!counterOn) {
        counterOn = 1;
        counter = 0;
        startTime();
    }
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
// add a move
// check if all pairs match to end game
function checkIfMatch() {
    if(openCards[0].firstChild.className === openCards[1].firstChild.className) {
        console.log("match");
        openCards[0].classList.add("tada");
        openCards[1].classList.add("tada");
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        pairs++;
    } else {
        console.log("no match");
        openCards[0].classList.toggle("shake");
        openCards[1].classList.toggle("shake");
    } 
    openCards = [];
    addMoves();
    if(pairs === 8) {
        endGame()
    }
}

// remove first child of ul https://stackoverflow.com/questions/14294518/remove-first-child-in-javascript
//increment moves by 1 after 2 cards opened
function addMoves() {
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
    if(moves === 13 || moves === 20) {
        // Remove the child from queue that is the first li element. 
        stars.removeChild(elements[0]);
    }
}

// timer function from https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
function startTime() {
    counter += 1;
    document.querySelector('.counter').innerHTML = counter; 
    t = setTimeout(startTime, 1000);
}

// clearTimeout function from https://www.w3schools.com/jsref/met_win_cleartimeout.asp
function stopTime() {
    clearTimeout(t);
    counterOn = 0;
}

// end game and stop the time
function endGame() {
    console.log("game over");
    stopTime();
    setTimeout(reStart, 800);
}

// confirm method from https://www.w3schools.com/jsref/met_win_confirm.asp
function reStart() {
    const playAgain = confirm("YEEEY! You finished the game in " + counter + " seconds and a " + elements.length + " star rating. Play again?");
    if(playAgain == true){
             window.location.reload();
         } else {
             alert("Thanks for playing!");
     }
}
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


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

// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

let openedCards = document.getElementsByClassName("show");

let matchedCard = document.getElementsByClassName("match");

// declare variables for star icons
let starsList = document.querySelectorAll(".fa-star");

let stars = document.getElementsByClassName("fa-star");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

let timer = document.querySelector(".timer");

let restart = document.querySelector(".restart");

let second = 0, minute = 0, hour = 0;

let interval;

//modal
let modal = document.getElementById("modal")

//close icon in modal
let closeIcon = document.querySelector(".fa-window-close");

let replay = document.querySelector("#replay")



function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

// deck of all cards in game
let deck = document.querySelector(".deck");

function startGame() { 
   let shuffledCards = shuffle(cards);
   for (let i = 0; i < shuffledCards.length; i++) {
      Array.prototype.forEach.call(shuffledCards, function(item) {
         deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "unmatched", "disabled");
   };

   // reset moves
     moves = 0;
     counter.innerHTML = moves;

    // reset star rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
        stars[i].classList.remove("starsLeft");
    }

   //reset timer
    clearInterval(interval);
    timer.innerHTML = "0 mins 0 secs";
};

document.onload = startGame();

// toggles open and show class to display cards
let displayCard = function () {
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
   cardOpen();
};

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
   cards[i].addEventListener("click", displayCard);
};

restart.addEventListener("click", startGame);

//add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push;
    let len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].id === openedCards[1].id) {
            matched();
        } else {
            unmatched();
        };
    };
};

//for when cards match
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[0].classList.remove("show", "open");
};

//for when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[0].classList.remove("show", "open", "unmatched");
        enable();
    }, 1100);
};

//disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
        restart.classList.add('disabled');
    });
};

//enable cards and disable matched cards
function enable() {
    restart.classList.remove('disabled');
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        };
    });
};

function moveCounter() {    
    moves++;    
    counter.innerHTML = moves;

// setting rates based on moves
    if (moves > 10 && moves < 15) {
        for(i = 0; i < 3; i++) {
            if(i > 1) {
                starsList[i].style.visibility = "collapse";
                stars[0].classList.add("starsLeft");
                stars[1].classList.add("starsLeft");
            };
        };
    } else {
        if (moves > 14 && moves < 16) {
            for(i = 0; i < 2; i++) {
                if(i > 0) {
                    stars[0].classList.remove("starsLeft");
                    stars[1].classList.remove("starsLeft");
                    starsList[i].style.visibility = "collapse";
                    setTimeout(function() {
                    stars[0].classList.add("starsLeft");
                    enable();
                    }, 10);
                };
            };
        };
    };

    //start timer on first move
    if (moves == 1) {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    };
};

//game timer
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
};


// when all cards match, show modal and moves, time and rating
function finished() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
    //show modal
    modal.classList.add("show");
    //declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    } ;
}

//close icon on modal
function closeModal() {
    modal.classList.remove("show");
    timer.innerHTML = "0 mins 0 secs";
    startGame();
};

//for player to play Again 
function playAgain(){
    modal.classList.remove("show");
    timer.innerHTML = "0 mins 0 secs";
    startGame();
}

deck.addEventListener("click", finished);

closeIcon.addEventListener("click", closeModal);

replay.addEventListener("click", playAgain);


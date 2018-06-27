// deck of all cards in game
let deck = document.querySelector(".deck");

// card variables
let card = document.getElementsByClassName("card");
let cards = [...card];
let openedCards = document.getElementsByClassName("show");
let matchedCard = document.getElementsByClassName("match");

// star icon variables
let starsList = document.querySelectorAll(".fa-star");
let stars = document.getElementsByClassName("fa-star");

// move variables
let moves = 0;
let counter = document.querySelector(".moves");

// timer variables
let timer = document.querySelector(".timer");
let second = 0, minute = 0, hour = 0;
let interval;

// restart icon variable
let restart = document.querySelector(".restart");

// modal
let modal = document.getElementById("modal")

// close icon in modal
let closeIcon = document.querySelector(".fa-window-close");

// replay variable
let replay = document.querySelector("#replay")


// shuffle function shuffles the cards, which is triggered by the startGame function

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

// startGame function is triggered: when the document has loaded, 
// when pressed restart or replay and close icons in the modal

function startGame() { 
   let shuffledCards = shuffle(cards);
   for (let i = 0; i < shuffledCards.length; i++) {
      Array.prototype.forEach.call(shuffledCards, function(item) {
         deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "unmatched", "disabled");
   };

   // resets moves
     moves = 0;
     counter.innerHTML = moves;

    // resets star rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
        stars[i].classList.remove("starsLeft");
    }

   // resets timer
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

// loops to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
   cards[i].addEventListener("click", displayCard);
};

// restart icon resets the game
restart.addEventListener("click", startGame);

// adds opened cards to openedCards list and checks if cards are match or not, triggers the moveCounter
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

// for when cards match
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[0].classList.remove("show", "open");
};

// for when cards don't match
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

// disables cards temporarily eg. between transitions
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
        restart.classList.add('disabled');
    });
};

// enables unmatched cards and disables matched cards
function enable() {
    restart.classList.remove('disabled');
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        };
    });
};

// adds moves to the counter
function moveCounter() {    
    moves++;    
    counter.innerHTML = moves;

// setting star rates based on moves
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

    // starts timer on first move (open pair of cards equals 1 move)
    if (moves == 1) {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    };
};

// game timer
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};


// when all cards match, shows modal with moves, time and rating
function finished() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
    // shows modal
    modal.classList.add("show");
    // declares star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    // shows move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    };
}

// closing modal
function closeModal() {
    modal.classList.remove("show");
    timer.innerHTML = "0 mins 0 secs";
    startGame();
};

// playing again -> startGame
function playAgain(){
    modal.classList.remove("show");
    timer.innerHTML = "0 mins 0 secs";
    startGame();
}

// event listeners to show modal, hide modal and resetting the game
deck.addEventListener("click", finished);
closeIcon.addEventListener("click", closeModal);
replay.addEventListener("click", playAgain);


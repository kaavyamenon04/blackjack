var dealerTotal = 0;
var myTotal = 0;

var dealerAceCount = 0;
var myAceCount = 0;

var facedown;
var deck;

var canHit = true; //allows player to draw while your sum is <= 21

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K" ];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++){
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i])
        }
    }
    // console.log(deck);
}

function shuffleDeck(){
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random()* deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] =  temp;
    }
    console.log(deck);
}

function startGame(){
    facedown = deck.pop();
    dealerTotal += getValue(facedown);
    dealerAceCount += checkAce(facedown);
    console.log(facedown);
    while (dealerTotal < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerTotal += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerTotal);

    for (let  i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        myTotal += getValue(card);
        myAceCount += checkAce(card);
        document.getElementById("my-cards").append(cardImg);

    }
    console.log(myTotal);
    document.getElementById("hit-btn").addEventListener("click", hit);
    document.getElementById("stay-btn").addEventListener("click", stay);

}

function hit(){
    if (!canHit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    myTotal += getValue(card);
    myAceCount += checkAce(card);
    document.getElementById("my-cards").append(cardImg);
    if (reduceAce(myTotal, myAceCount) > 21){
        canHit = false;
    }

}

function stay(){
    dealerTotal = reduceAce(dealerTotal, dealerAceCount);
    myTotal = reduceAce(myTotal, myAceCount);
    canHit = false;
    document.getElementById("facedown").src  = "./cards/" + facedown + ".png";
    let message = "";

    if (myTotal > 21){
        message = "You lost!";
    } else if (dealerTotal > 21){
        message =  "You win!";
    } else if (myTotal == dealerTotal){
        message = "You tied.";
    } else if (myTotal > dealerTotal){
        message = "You win!";
    } else if (myTotal < dealerTotal){
        message = "You lose!";
    }
    document.getElementById("dealer_total").innerText = dealerTotal;
    document.getElementById("my_total").innerText = myTotal;
    document.getElementById("results").innerText = message;
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];
    if (isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}



function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount){
    while (playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
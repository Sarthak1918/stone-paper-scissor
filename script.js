let playerChoiceBox = document.querySelector("#player-choice")
let compChoiceBox = document.querySelector("#comp-choice")
let playerValue;
let compValue;

let compScore = 0;
let playerScore = 0;
let compScoreElem = document.querySelector("#comp-score");
let playerScoreElem = document.querySelector("#player-score");


let playerNameElem = document.querySelector("#player-name");
let playerName = "You";


let winnerCheck = document.querySelector("#winner-check");

let gameCount = 0;


let prevPlayerScoreElem = document.querySelector("#prev-player-score")
let prevCompScoreElem = document.querySelector("#prev-comp-score")


let overlay = document.querySelector(".overlay")

let finalDeclaration = document.querySelector("#final-declaration")

function handleChange(e) {
    playerName = e.target.value.trim(0);
}

function handleKeypress(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        playerNameElem.innerHTML = playerName;
        document.querySelector("#player-grid").innerHTML = playerName;
    }
}

function toggleInput(e) {
    if (!playerNameElem.querySelector("input")) {
        playerNameElem.innerHTML = `<input class="name-change-input" oninput="handleChange(event)" onkeydown="handleKeypress(event)" autofocus value="${playerName}" />`;
    }
}

function imageClick(e) {
    let choiceImg = e.target;
    playerChoiceBox.innerHTML = `<img class="shake" src=${choiceImg.src} id="player-choice-img" name=${choiceImg.name}>`
    playerValue = choiceImg.name;
    compValue = random()
    check(compValue, playerValue);
    if(compValue!=playerValue){
        ++gameCount;
    }
    console.log(gameCount);
    if (gameCount == 5) {
        if (playerScore > compScore) {
            console.log(`${playerName} Won the game`);
        }
        else if (playerScore < compScore) {
            console.log("Computer Won the game");
        }
        else {
            console.log("Draw");
        }
        gameCount = 0;
        prevPlayerScoreElem.innerHTML = playerScore;
        prevCompScoreElem.innerHTML = compScore;

        overlay.style.display= "flex";


        if(playerScore > compScore) finalDeclaration.textContent = "Congratulations!🎉🎊 You won this round."
        else if(playerScore > compScore) finalDeclaration.textContent = "Computer Won☹️Try Again."
    }

}

//function to generate a random choice by computer
function random() {
    let scissor = "scissor"
    let paper = "paper"
    let stone = "stone"
    let imgArr = [scissor, paper, stone];

    randIdx = Math.floor(Math.random() * imgArr.length);
    compRandomImg = imgArr[randIdx]
    compChoiceBox.innerHTML = `<img class="shake" src="./assets/${compRandomImg}.png" id="comp-choice-img" name=${compRandomImg}>`
    return compRandomImg;
}


// possibilities
//comp - player : who wins(-1:draw, 0:comp, 1:player)
//stone-stone : -1
//stone-paper : 1
//stone-scissor : 0

//paper-paper :  -1
//paper-stone :  0
//paper-scissor: 1

//scissor-scissor : -1
//scissor-paper: 0
//scissor-stone: 1


let resObj = {
    "stone - stone": -1,
    "stone - paper": 1,
    "stone - scissor": 0,

    "paper - paper": -1,
    "paper - stone": 0,
    "paper - scissor": 1,

    "scissor - scissor": -1,
    "scissor - paper": 0,
    "scissor - stone": 1
}

function check(compValue, playerValue) {
    let result = `${compValue} - ${playerValue}`;
    let whoWins = resObj[result];
    switch (whoWins) {
        case 1:
            // console.log("Player Won");
            playerScoreElem.textContent = ++playerScore;
            winnerCheck.textContent = "You Won Now"
            break;
        case 0:
            // console.log("computer Won");
            compScoreElem.textContent = ++compScore;
            winnerCheck.textContent = "Computer Won Now"
            break;
        default:
            // console.log("Draw");
            winnerCheck.textContent = "Draw"
            break;
    }
}



function reset(e,hide) {
    playerChoiceBox.innerHTML = "";
    compChoiceBox.innerHTML = "";
    playerScore = 0;
    compScore = 0;
    playerScoreElem.textContent = 0;
    compScoreElem.textContent = 0;
    winnerCheck.textContent = "";
    gameCount = 0;

    if(hide){
        overlay.style.display="none"
    }

}
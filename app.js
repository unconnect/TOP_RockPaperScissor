/**
 * Computer play
 * @returns {string} a random choice from: rock, paper or scissor
 */
const computerPlay = function () {
    const choices = ['rock', 'paper', 'scissor'];
    const randomChoice = getRandomInt(choices.length);
    return choices[randomChoice];
}

/**
 * Get a random integer
 * @param {int} max the highest value to get back
 * @returns {int} a random integer from 0 to max
 */
const getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
}

/**
 * Plays a single round of Rock Paper Scissors
 * 
 * @param {string} playerSelection the players choice
 * @param {string} computerSelection the randomly selected computers choice
 * @returns {object} roundResult
 */
const getGameRoundResult = function (playerSelection, computerSelection) {

    const roundResult = {
        playerPoint: 0,
        computerPoint: 0
    }

    playerSelection = (playerSelection) ? playerSelection.toLowerCase() : '';
    computerSelection = computerSelection.toLowerCase();

    const playerWonRound = (
        playerSelection === 'rock' && computerSelection === 'scissor' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissor' && computerSelection === 'paper'
    );
    const tie = (playerSelection === computerSelection);
    const computerWon = (!playerWonRound && !tie);

    // Debug check the computers selection for this round.
    console.log('Players selection: ' + playerSelection);
    console.log('Computers selection: ' + computerSelection);

    if (computerWon) {
        roundResult.playerPoint = 0;
        roundResult.computerPoint = 1;
    } else if (playerWonRound) {
        roundResult.playerPoint = 1;
        roundResult.computerPoint = 0;
    } else if (tie) {
        roundResult.playerPoint = 0;
        roundResult.computerPoint = 0;
    }

    console.log(roundResult);
    return roundResult;

}

/**
 * Checks the game result for winner
 * @param {object} gameResult gets the players and computers game score
 * @returns {string} winner
 */
const getWinner = function (gameResult) {
    let winner = '';

    if (gameResult.playerPoints > gameResult.computerPoints) {
        winner = 'the Player';
    } else if (gameResult.playerPoints < gameResult.computerPoints) {
        winner = 'the Computer';
    } else {
        winner = 'Nobody';
    }

    return winner;
}

/**
 * Play 1 game round
 *  
 */


const playGameRound = function (selectedButtonValue) {

    const computerSelection = computerPlay();
    const playerSelection = selectedButtonValue;
    const gameRoundResult = getGameRoundResult(playerSelection, computerSelection);

    gameResult.playerPoints += gameRoundResult.playerPoint;
    gameResult.computerPoints += gameRoundResult.computerPoint;

    console.log(`Player vs. Computer ${gameResult.playerPoints} : ${gameResult.computerPoints}`);

}

const uiElements = {
    buttons: {
        buttonRock: document.getElementById('buttonRock'),
        buttonPaper: document.getElementById('buttonPaper'),
        buttonScissor: document.getElementById('buttonScissor')
    }
}

const maxGameRounds = 5;
let gameIsFinished = false;
let gameRound = 1; // Sentinel

const gameResult = {
    playerPoints: 0,
    computerPoints: 0
};

let winner = '';

const game = function(e) {
    


    console.log('Game round: ' + gameRound);
    gameIsFinished = (gameRound >= maxGameRounds) ? true : false;

    // Check for Winner and Gameround counter must be rethinked!

    if (!gameIsFinished) {
        playGameRound(e.target.value);
    } else {
        winner = getWinner(gameResult);
        console.log(`The winner of the game is ${winner}!`);
    }
    gameRound++;

}

Object.values(uiElements.buttons).forEach(button => {
    button.addEventListener('click', game, false);
});


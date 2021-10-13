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

    let roundResult = {
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
 * The main game loop
 *  
 */

const playGameRound = function (event) {

    let playerSelection;
    let computerSelection;

    let winner = '';


        // We need to check if a button was clicked,
        // otherwise asked for it
        // when no button was clicked the game must wait
        // for button click
        // we need a variable to check if the player clicked a button,
        // if this is the case we can varlidate the play result otherwise re run
        // the while loop.
        // maybe the while loop is not the solution here anymore!!!

    
        let gameRoundResult = {
            playerPoint: 0,
            computerPoint: 0
        };

        console.log('Event Target Value: ' + event.target.value);
        
        computerSelection = computerPlay();
        playerSelection = event.target.value
        gameRoundResult = getGameRoundResult(playerSelection, computerSelection);
        // The returned result should be used here.

        gameResult.playerPoints += gameRoundResult.playerPoint;
        gameResult.computerPoints += gameRoundResult.computerPoint;

        console.log(`Player vs. Computer ${gameResult.playerPoints} : ${gameResult.computerPoints}`);

        // This need to be changed
        // be should count the game rounds but do it eventually outside this function
        // if game is finished we need to destroy the event listener or the buttons
        // and show the results
        console.log('Game round: ' + gameRound);
        gameRound++;
        gameIsNotFinished = (gameRound > maxGameRounds) ? false : true;

        // TODO: Check for Game is finished and populate the winner
        // handle the Gameresult display in the UI


    winner = getWinner(gameResult);

    console.log(`The winner of the game is ${winner}!`);

}

const maxGameRounds = 5;
let gameIsNotFinished = true;
let gameRound = 1; // Sentinel

let gameResult = {
    playerPoints: 0,
    computerPoints: 0
};

const uiElements = {
    buttons: {
        buttonRock: document.getElementById('buttonRock'),
        buttonPaper: document.getElementById('buttonPaper'),
        buttonScissor: document.getElementById('buttonScissor')
    }
}

uiElements.buttons.buttonRock.addEventListener('click', playGameRound, false);
uiElements.buttons.buttonPaper.addEventListener('click', playGameRound, false);
uiElements.buttons.buttonScissor.addEventListener('click', playGameRound, false);
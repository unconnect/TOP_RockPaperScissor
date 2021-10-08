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
const playGameRound = function (playerSelection, computerSelection) {

    let roundResult = {
        playerPoint: 0,
        computerPoint: 0
    }

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    const playerWonRound = (
        playerSelection === 'rock' && computerSelection === 'scissor' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissor' && computerSelection === 'paper'
    );
    const isTie = (playerSelection === computerSelection);

    // Debug check the computers selection for this round.
    console.log('Players selection: ' + playerSelection);
    console.log('Computers selection: ' + computerSelection);
    

    // What are we returning now? Maybe it should update an object and returns that everytime?
    //
    // I thing the best (right now) would be to return JUST the result of each round,
    // for each player. 
    // The result could be an object.
    // The result should than be used outside this function.

    if (isTie) {
        roundResult.playerPoint = 0;
        roundResult.computerPoint = 0;
    }

    if (playerWonRound) {
        roundResult.playerPoint = 1;
        roundResult.computerPoint = 0;
    } else if (!playerWonRound && !isTie) {
        roundResult.playerPoint = 0;
        roundResult.computerPoint = 1;
    }

    console.log(roundResult);
    return roundResult;

}

/**
 * Prompts for the players selection and gives a random default
 * @returns {string} Players selection
 */
const playerPlay = function () {
    return prompt('Please make your choice (Rock, Paper or Scissor): ', computerPlay());
}

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

const game = function () {
    const maxGameRounds = 5;
    let gameIsNotFinished = true;
    let gameRound = 1; // Sentinel

    let playerSelection;
    let computerSelection;

    let gameResult = {
        playerPoints: 0,
        computerPoints: 0
    };

    let winner = '';

    // Loop while game is not finished. Inside the loop we should update the gameround counter.
    while (gameIsNotFinished) {

        let roundResult = {
            playerPoint: 0,
            computerPoint: 0
        };

        console.log(gameRound, gameIsNotFinished);

        playerSelection = playerPlay();
        computerSelection = computerPlay();
        roundResult = playGameRound(playerSelection, computerSelection);
        // The returned result should be used here.

        gameResult.playerPoints += roundResult.playerPoint;
        gameResult.computerPoints += roundResult.computerPoint;

        console.log(`Player vs. Computer ${gameResult.playerPoints} : ${gameResult.computerPoints}`)

        // Update Sentinel
        gameRound++;
        gameIsNotFinished = (gameRound > maxGameRounds) ? false : true;
    }

    winner = getWinner(gameResult);

    console.log(`The winner of the game is ${winner}!`);

}

game();

// // Debug play randomly selection for both player for testing the game logic.
// console.log(playGameRound(playerSelection, computerSelection));


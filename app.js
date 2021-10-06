/**
 * Computer play
 * @returns a random choice from: rock, paper or scissor
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
 * @returns {string} the result of the round
 */
const playGameRound = function (playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    const playerWonRound = (
        playerSelection === 'rock' && computerSelection === 'scissor' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissor' && computerSelection === 'paper'
    );
    const isTie = (playerSelection === computerSelection);

    // Debug check the computers selection for this round.
    console.log('Computers selection: ' + computerSelection);
    console.log('Players selection: ' + playerSelection);

    if (isTie) {
        return `It's a tie, Player selected ${playerSelection} and Computer selected ${computerSelection}.`;
    } else if (playerWonRound) {
        return `The Player won the round, ${playerSelection} wins against ${computerSelection}!`;
    }

    return `The Computer won the round, ${computerSelection} wins against ${playerSelection}!`;

}

// Debug play randomly selection for both player for testing the game logic.
console.log(playGameRound(computerPlay(), computerPlay()));


/**
 * TODO:
 * - [ ] Create buttons with js
 * - [x] Mark selected players hand
 * - [x] remove timeouts or make them work better
 * - [x] Restart game with button and no countdown
 * - [x] show game status in separate ui section
 */

/**
 * Computer play
 * @returns {string} a random choice from: rock, paper or scissor
 */
const computerPlay = function () {
  const choices = ['rock', 'paper', 'scissor']
  const randomChoice = getRandomInt(choices.length)
  return choices[randomChoice]
}

/**
 * Get a random integer
 * @param {int} max the highest value to get back
 * @returns {int} a random integer from 0 to max
 */
const getRandomInt = function (max) {
  return Math.floor(Math.random() * max)
}

/**
 * Create and attach a game status message balloon with computer or player selection
 * @param {boolean} messageOrientationToRight
 * @param {string} messageTextContent
 * @param {string} messageMarkupContent
 */
const createAndAttachGameStatusMessageBalloon = function (
  messageOrientationToRight = false,
  messageTextContent = '',
  messageMarkupContent
) {
  const message = document.createDocumentFragment()
  const messageSection = document.createElement('section')
  const playerIcon = document.createElement('i')
  const messageOrientationClass = messageOrientationToRight === true ? '-right' : '-left'
  const messageBalloon = document.createElement('div')
  const messageAdditionalContent = document.createElement('div')
  const messageText = document.createElement('p')
  const messageList = document.querySelector('.message-list')

  messageSection.classList.add('message', messageOrientationClass)

  messageText.textContent = messageTextContent
  messageBalloon.classList.add('nes-balloon', 'from' + messageOrientationClass)
  messageBalloon.appendChild(messageText)

  if (messageMarkupContent) {
    messageAdditionalContent.innerHTML = messageMarkupContent
    messageBalloon.appendChild(messageAdditionalContent)
  }

  messageSection.appendChild(messageBalloon)
  message.appendChild(messageSection)

  if (messageOrientationToRight) {
    playerIcon.classList.add('nes-mario')
    message.querySelector('.nes-balloon').after(playerIcon)
  } else {
    playerIcon.classList.add('nes-bcrikko')
    message.querySelector('.nes-balloon').before(playerIcon)
  }

  messageList.appendChild(message)
  messageList.scrollTop = messageList.scrollHeight
}

/**
 * Plays a single round of Rock Paper Scissors and attaches messages with selections to game status message list
 *
 * @param {string} playerSelection the players choice
 * @param {string} computerSelection the randomly selected computers choice
 * @returns {object} Returns an object with the game round result
 */
const calculateAndAttachGameRoundResult = function (playerSelection, computerSelection) {
  const roundResult = {
    computerPoint: 0,
    playerPoint: 0,
  }

  playerSelection = playerSelection ? playerSelection.toLowerCase() : ''
  computerSelection = computerSelection.toLowerCase()

  const playerWonRound =
    (playerSelection === 'rock' && computerSelection === 'scissor') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissor' && computerSelection === 'paper')
  const tie = playerSelection === computerSelection
  const computerWon = !playerWonRound && !tie

  if (computerWon) {
    roundResult.computerPoint = 1
    roundResult.playerPoint = 0
  } else if (playerWonRound) {
    roundResult.computerPoint = 0
    roundResult.playerPoint = 1
  } else if (tie) {
    roundResult.computerPoint = 0
    roundResult.playerPoint = 0
  }

  return roundResult
}

/**
 * Checks the game result for winner
 * @param {object} gameResult gets the players and computers game score
 * @returns {string} winner
 */
const getWinner = function (gameResult) {
  if (gameResult.playerPoints > gameResult.computerPoints) {
    winner = 'Player'
  } else if (gameResult.playerPoints < gameResult.computerPoints) {
    winner = 'Computer'
  } else {
    winner = 'Nobody'
  }

  return winner
}

/**
 * Check if someone won the game
 * @param {object} gameRoundResult
 * @return {boolean} Returns true if one player has reached the min. points to win.
 */
const checkGameForEnd = function (gameResult) {
  const pointsToWin = 5
  return gameResult.playerPoints == pointsToWin || gameResult.computerPoints == pointsToWin
}

/**
 * Refreshes the game score
 * @param {object} gameResult
 */

const refreshGamescore = function (gameResult) {
  const computerScoreElement = document.querySelector('.score__computer')
  const playerScoreElement = document.querySelector('.score__player')

  computerScoreElement.textContent = gameResult.computerPoints
  playerScoreElement.textContent = gameResult.playerPoints
}

/**
 * Play one game round
 * @param {object} event
 */
const playGameRound = function (event) {
  const computerSelection = computerPlay()
  const playerSelection = event.target.value
  const gameRoundResult = calculateAndAttachGameRoundResult(playerSelection, computerSelection)
  let messageDelay = 500
  let countdown = 5

  gameResult.playerPoints += gameRoundResult.playerPoint
  gameResult.computerPoints += gameRoundResult.computerPoint

  Array.from(event.target.parentElement.parentElement.children).forEach((child) =>
    child.classList.remove('selected')
  )
  event.target.parentElement.classList.add('selected')

  createAndAttachGameStatusMessageBalloon(true, 'You played: ' + playerSelection)
  createAndAttachGameStatusMessageBalloon(false, 'I played: ' + computerSelection)
}

/**
 * Reloads the browser window and restarts the game
 */

const restartGame = function () {
  window.location.reload()
}

const uiElements = {
  buttons: {
    buttonRock: document.getElementById('buttonRock'),
    buttonPaper: document.getElementById('buttonPaper'),
    buttonScissor: document.getElementById('buttonScissor'),
  },
}

let timeOutHandler = 0
let gameRound = 1 // Sentinel

const gameResult = {
  playerPoints: 0,
  computerPoints: 0,
}

const playGame = function (e) {
  console.log('Game round: ' + gameRound)
  // Check for Winner and Gameround counter must be rethinked!
  playGameRound(e)
  gameRound++
  refreshGamescore(gameResult)

  // extract in sepearte function
  if (checkGameForEnd(gameResult)) {
    const winner = getWinner(gameResult)

    if (winner === 'Computer') {
      createAndAttachGameStatusMessageBalloon(false, `I have won the game!`, '<i class="nes-icon trophy is-large"></i>')
    }

    if (winner === 'Player') {
      createAndAttachGameStatusMessageBalloon(
        true,
        `You have won the game!`,
        '<i class="nes-icon trophy is-large"></i>'
      )
    }

    createAndAttachGameStatusMessageBalloon(
      false,
      `Do you want to play a new game?`,
      '<button type="button" class="nes-btn is-success" onclick="restartGame()">Yes please!</button>'
    )
    Object.values(uiElements.buttons).forEach((button) => {
      button.removeEventListener('click', playGame, false)
    })
  }
}

Object.values(uiElements.buttons).forEach((button) => {
  button.addEventListener('click', playGame, false)
})

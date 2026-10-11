import { TURN_RESULT } from '../core/game/game.constants.js'
import { MISMATCH_CLOSE_DELAY } from './game-controller.constants.js'

export function createGameController({
  cardValues,
  renderGame,
  onGameComplete,
  onCardFlip,
  onCardFlipBack,
  gameService,
  mismatchCloseDelay = MISMATCH_CLOSE_DELAY,
  schedule = setTimeout,
  cancelScheduled = clearTimeout
}) {
  let currentGame = gameService.createGame(cardValues)
  let isInputLocked = false
  let mismatchCloseTimerId = null

  renderGame(currentGame)

  function handleCardClick(cardId) {
    if (isInputLocked) {
      return
    }

    const { game: updatedGame, turnResult } = gameService.handleCardSelection(
      currentGame,
      cardId
    )

    if (updatedGame.gameState === currentGame.gameState) {
      return
    }

    currentGame = updatedGame
    renderGame(currentGame)
    onCardFlip()

    if (!turnResult) {
      return
    }

    if (turnResult === TURN_RESULT.MATCHED) {
      finishMatchedTurn()
      return
    }

    startMismatchTimer()
  }

  function finishMatchedTurn() {
    currentGame = gameService.finishTurn(currentGame, TURN_RESULT.MATCHED)

    renderGame(currentGame)

    if (currentGame.gameState.isGameComplete) {
      onGameComplete(currentGame)
    }
  }

  function startMismatchTimer() {
    isInputLocked = true

    mismatchCloseTimerId = schedule(() => {
      currentGame = gameService.finishTurn(currentGame, TURN_RESULT.NOT_MATCHED)
      renderGame(currentGame)
      onCardFlipBack()

      mismatchCloseTimerId = null
      isInputLocked = false
    }, mismatchCloseDelay)
  }

  function startNewGame() {
    cancelScheduled(mismatchCloseTimerId)

    mismatchCloseTimerId = null
    isInputLocked = false

    currentGame = gameService.createGame(cardValues)

    renderGame(currentGame)
  }

  return {
    handleCardClick,
    startNewGame
  }
}

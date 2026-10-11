import { TURN_RESULT } from './game.constants.js'
import { checkCardCanBeOpened, checkGameComplete } from './game.rules.js'
import {
  addMatchedCards,
  closeOpenedCards,
  incrementMovesCount,
  openCard
} from './game.state.js'

export function selectCard(gameState, cardId) {
  const canOpenCard = checkCardCanBeOpened(
    gameState.openedCardIds,
    gameState.matchedCardIds,
    cardId
  )

  if (!canOpenCard) {
    return gameState
  }

  const openedCardIds = openCard(gameState.openedCardIds, cardId)

  return {
    ...gameState,
    openedCardIds
  }
}

export function playTurn(gameState, cards, turnResult) {
  const [firstCardId, secondCardId] = gameState.openedCardIds
  const movesCount = incrementMovesCount(gameState.movesCount)

  let matchedCardIds = gameState.matchedCardIds

  if (turnResult === TURN_RESULT.MATCHED) {
    matchedCardIds = addMatchedCards(matchedCardIds, firstCardId, secondCardId)
  }

  const isGameComplete = checkGameComplete(matchedCardIds, cards)

  return {
    ...gameState,
    openedCardIds: closeOpenedCards(),
    matchedCardIds,
    movesCount,
    isGameComplete
  }
}

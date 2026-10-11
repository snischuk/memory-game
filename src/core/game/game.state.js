const INITIAL_MOVES_COUNT = 0
const MOVE_COUNT_INCREMENT = 1

export function createGameState() {
  return {
    openedCardIds: [],
    matchedCardIds: [],
    movesCount: INITIAL_MOVES_COUNT,
    isGameComplete: false
  }
}

export function openCard(openedCardIds, cardId) {
  return [...openedCardIds, cardId]
}

export function closeOpenedCards() {
  return []
}

export function addMatchedCards(matchedCardIds, firstCardId, secondCardId) {
  return [...matchedCardIds, firstCardId, secondCardId]
}

export function incrementMovesCount(movesCount) {
  return movesCount + MOVE_COUNT_INCREMENT
}

export function createGameState() {
  return {
    openedCardIds: [],
    matchedCardIds: [],
    movesCount: 0,
    isGameComplete: false,
  };
}

export function openCard(openedCardIds, cardId) {
  return [...openedCardIds, cardId];
}

export function closeOpenedCards() {
  return [];
}

export function addMatchedCards(matchedCardIds, firstCardId, secondCardId) {
  return [...matchedCardIds, firstCardId, secondCardId];
}

export function incrementMovesCount(movesCount) {
  return movesCount + 1;
}

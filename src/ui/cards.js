export function createGameBoard() {
  const gameBoardElement = document.createElement('div');

  gameBoardElement.classList.add('game-board');

  return gameBoardElement;
}

export function renderCards(gameBoardElement, cards, gameState) {
  gameBoardElement.replaceChildren();

  cards.forEach((card) => {
    const cardElement = document.createElement('button');

    const isCardOpened = gameState.openedCardIds.includes(card.id);

    const isCardMatched = gameState.matchedCardIds.includes(card.id);

    cardElement.dataset.cardId = card.id;

    if (isCardOpened || isCardMatched) {
      cardElement.textContent = card.value;
    } else {
      cardElement.textContent = '?';
    }

    gameBoardElement.append(cardElement);
  });
}

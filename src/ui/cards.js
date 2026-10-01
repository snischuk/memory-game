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

    cardElement.classList.add('card');
    cardElement.dataset.cardId = card.id;

    const cardInnerElement = document.createElement('div');
    cardInnerElement.classList.add('card-inner');

    const cardBackElement = document.createElement('div');
    cardBackElement.classList.add('card-face', 'card-back');
    cardBackElement.textContent = '?';

    const cardFrontElement = document.createElement('div');
    cardFrontElement.classList.add('card-face', 'card-front');
    cardFrontElement.textContent = card.value;

    if (isCardOpened || isCardMatched) {
      cardElement.classList.add('is-flipped');
    }

    cardElement.setAttribute(
      'aria-label',
      isCardOpened || isCardMatched ? `Card ${card.value}` : 'Hidden card',
    );

    cardInnerElement.append(cardBackElement, cardFrontElement);
    cardElement.append(cardInnerElement);
    gameBoardElement.append(cardElement);
  });
}

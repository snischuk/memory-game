import './game-board.element.css';

import { createCard } from '../../ui/card/card.ui.js';

export function createGameBoard() {
  const gameBoardElement = document.createElement('div');

  gameBoardElement.classList.add('game-board');

  const cardElements = new Map();
  const previousCardsState = new Map();

  let previousCardOrder = [];

  function render(cards, gameState) {
    const currentCardOrder = cards.map((card) => card.id);

    const hasCardOrderChanged = !areArraysEqual(
      currentCardOrder,
      previousCardOrder,
    );

    if (hasCardOrderChanged) {
      synchronizeCardOrder(cards);
      previousCardOrder = currentCardOrder;
    }

    cards.forEach((card) => {
      const isCardOpened = gameState.openedCardIds.includes(card.id);
      const isCardMatched = gameState.matchedCardIds.includes(card.id);

      let cardElement = cardElements.get(card.id);

      if (!cardElement) {
        cardElement = createCard(card);
        cardElements.set(card.id, cardElement);
      }

      const previousCardState = previousCardsState.get(card.id);

      updateCardElement(
        cardElement,
        isCardOpened,
        isCardMatched,
        card.value,
        previousCardState,
      );

      previousCardsState.set(card.id, {
        isCardOpened,
        isCardMatched,
      });
    });
  }

  function synchronizeCardOrder(cards) {
    cards.forEach((card) => {
      let cardElement = cardElements.get(card.id);

      if (!cardElement) {
        cardElement = createCard(card);
        cardElements.set(card.id, cardElement);
      }

      gameBoardElement.append(cardElement);
    });
  }

  return {
    gameBoardElement,
    render,
  };
}

function updateCardElement(
  cardElement,
  isCardOpened,
  isCardMatched,
  cardValue,
  previousCardState,
) {
  const shouldFlipCard = isCardOpened || isCardMatched;

  const wasCardFlipped =
    previousCardState &&
    (previousCardState.isCardOpened || previousCardState.isCardMatched);

  const shouldFlipCardChange =
    !previousCardState || shouldFlipCard !== wasCardFlipped;

  if (!shouldFlipCardChange) {
    return;
  }

  cardElement.classList.toggle('is-flipped', shouldFlipCard);

  cardElement.setAttribute(
    'aria-label',
    shouldFlipCard ? `Card ${cardValue}` : 'Hidden card',
  );
}

function areArraysEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  return firstArray.every((value, index) => value === secondArray[index]);
}

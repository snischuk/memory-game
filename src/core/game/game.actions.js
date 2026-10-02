import { TURN_RESULT } from './game.constants.js';

import {
  openCard,
  closeOpenedCards,
  addMatchedCards,
  incrementMovesCount,
} from './game.state.js';

export function createCards(cardValues) {
  const cards = [];

  cardValues.forEach((cardValue) => {
    cards.push(
      {
        id: cards.length,
        value: cardValue,
      },
      {
        id: cards.length + 1,
        value: cardValue,
      },
    );
  });

  return cards;
}

export function shuffleCards(cards) {
  const shuffledCards = [...cards];

  for (
    let currentIndex = shuffledCards.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[currentIndex],
    ];
  }

  return shuffledCards;
}

export function checkCardCanBeOpened(openedCardIds, matchedCardIds, cardId) {
  const canOpenAnotherCard = openedCardIds.length < 2;
  const isCardAlreadyOpened = openedCardIds.includes(cardId);
  const isCardAlreadyMatched = matchedCardIds.includes(cardId);

  return canOpenAnotherCard && !isCardAlreadyOpened && !isCardAlreadyMatched;
}

export function checkPair(firstCard, secondCard) {
  return firstCard.value === secondCard.value;
}

export function getTurnResult(firstCard, secondCard) {
  if (checkPair(firstCard, secondCard)) {
    return TURN_RESULT.MATCHED;
  }

  return TURN_RESULT.NOT_MATCHED;
}

export function checkGameComplete(matchedCardIds, cards) {
  return matchedCardIds.length === cards.length;
}

export function getCardById(cards, cardId) {
  return cards.find((card) => card.id === cardId);
}

export function getOpenedCards(cards, openedCardIds) {
  const firstCard = getCardById(cards, openedCardIds[0]);
  const secondCard = getCardById(cards, openedCardIds[1]);

  return {
    firstCard,
    secondCard,
  };
}

export function selectCard(gameState, cardId) {
  const canOpenCard = checkCardCanBeOpened(
    gameState.openedCardIds,
    gameState.matchedCardIds,
    cardId,
  );

  if (!canOpenCard) {
    return gameState;
  }

  const openedCardIds = openCard(gameState.openedCardIds, cardId);

  return {
    ...gameState,
    openedCardIds,
  };
}

export function playTurn(gameState, cards, turnResult) {
  const firstCardId = gameState.openedCardIds[0];
  const secondCardId = gameState.openedCardIds[1];

  const movesCount = incrementMovesCount(gameState.movesCount);

  let matchedCardIds = gameState.matchedCardIds;

  if (turnResult === TURN_RESULT.MATCHED) {
    matchedCardIds = addMatchedCards(matchedCardIds, firstCardId, secondCardId);
  }

  const isGameComplete = checkGameComplete(matchedCardIds, cards);

  return {
    ...gameState,
    openedCardIds: closeOpenedCards(),
    matchedCardIds,
    movesCount,
    isGameComplete,
  };
}

export function getTotalPairsCount(cards) {
  return cards.length / 2;
}

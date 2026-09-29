import { TURN_RESULT } from './constants.js';

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

export function createGameState() {
  return {
    openedCardIds: [],
    matchedCardIds: [],
    movesCount: 0,
    isGameComplete: false,
  };
}

export function createGame(cardValues) {
  const cards = createCards(cardValues);
  const shuffledCards = shuffleCards(cards);
  const gameState = createGameState();

  return {
    cards: shuffledCards,
    gameState,
  };
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

export function addMatchedCards(matchedCardIds, firstCardId, secondCardId) {
  return [...matchedCardIds, firstCardId, secondCardId];
}

export function closeOpenedCards() {
  return [];
}

export function incrementMovesCount(movesCount) {
  return movesCount + 1;
}

export function playTurn(gameState, cards, turnResult) {
  const firstCardId = gameState.openedCardIds[0];

  const secondCardId = gameState.openedCardIds[1];

  const movesCount = incrementMovesCount(gameState.movesCount);

  let matchedCardIds = gameState.matchedCardIds;

  if (turnResult === TURN_RESULT.MATCHED) {
    matchedCardIds = addMatchedCards(matchedCardIds, firstCardId, secondCardId);
  }

  return {
    ...gameState,
    openedCardIds: closeOpenedCards(),
    matchedCardIds,
    movesCount,
  };
}

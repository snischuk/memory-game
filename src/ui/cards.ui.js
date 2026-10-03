const cardElements = new Map();
const previousCardsState = new Map();

export function createGameBoard() {
  const gameBoardElement = document.createElement('div');
  gameBoardElement.classList.add('game-board');
  return gameBoardElement;
}

export function renderCards(gameBoardElement, cards, gameState) {
  cards.forEach((card) => {
    const isCardOpened = gameState.openedCardIds.includes(card.id);
    const isCardMatched = gameState.matchedCardIds.includes(card.id);
    const cardElement = cardElements.get(card.id);

    if (!cardElement) {
      const newCardElement = createCardElement(card);
      gameBoardElement.append(newCardElement);
      cardElements.set(card.id, newCardElement);
      updateCardElement(newCardElement, isCardOpened, isCardMatched, card);
      previousCardsState.set(card.id, { isCardOpened, isCardMatched });
      return;
    }

    const previousCardState = previousCardsState.get(card.id);

    updateCardElement(
      cardElement,
      isCardOpened,
      isCardMatched,
      card,
      previousCardState,
    );

    previousCardsState.set(card.id, { isCardOpened, isCardMatched });
  });
}

function createCardElement(card) {
  const cardElement = document.createElement('button');
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

  cardInnerElement.append(cardBackElement, cardFrontElement);
  cardElement.append(cardInnerElement);

  return cardElement;
}

function updateCardElement(
  cardElement,
  isCardOpened,
  isCardMatched,
  card,
  previousCardState,
) {
  const shouldFlipCard = isCardOpened || isCardMatched;
  const shouldFlipCardChange =
    !previousCardState ||
    shouldFlipCard !==
      (previousCardState.isCardOpened || previousCardState.isCardMatched);

  if (shouldFlipCardChange) {
    cardElement.classList.toggle('is-flipped', shouldFlipCard);
    cardElement.setAttribute(
      'aria-label',
      shouldFlipCard ? `Card ${card.value}` : 'Hidden card',
    );
  }
}

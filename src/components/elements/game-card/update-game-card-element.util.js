export function updateGameCardElement(
  cardElement,
  isCardOpened,
  isCardMatched,
  cardValue,
  previousCardState,
  messages,
) {
  const shouldFlipCard = isCardOpened || isCardMatched;
  const cardValueText = String(cardValue);
  const cardFrontElement = cardElement.querySelector('.card-front');
  const hasCardValueChanged =
    cardFrontElement.textContent !== cardValueText ||
    previousCardState?.cardValue !== cardValueText;
  const wasCardFlipped =
    previousCardState &&
    (previousCardState.isCardOpened || previousCardState.isCardMatched);
  const shouldFlipCardChange =
    !previousCardState || shouldFlipCard !== wasCardFlipped;

  if (!shouldFlipCardChange && !hasCardValueChanged) {
    return;
  }

  cardFrontElement.textContent = cardValueText;
  cardElement.classList.toggle('is-flipped', shouldFlipCard);
  cardElement.setAttribute(
    'aria-label',
    shouldFlipCard
      ? messages.game.cardLabel(cardValue)
      : messages.game.hiddenCard,
  );
}

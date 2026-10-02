export function createCounters() {
  const movesCountElement = document.createElement('div');
  const matchedPairsCountElement = document.createElement('div');

  movesCountElement.classList.add('counter');
  matchedPairsCountElement.classList.add('counter');

  return {
    movesCountElement,
    matchedPairsCountElement,
  };
}

export function renderMovesCount(movesCountElement, movesCount) {
  movesCountElement.textContent = `Moves: ${movesCount}`;
}

export function renderMatchedPairsCount(
  matchedPairsCountElement,
  matchedCardIds,
  totalPairsCount,
) {
  const matchedPairsCount = matchedCardIds.length / 2;

  matchedPairsCountElement.textContent = `Pairs: ${matchedPairsCount} / ${totalPairsCount}`;
}

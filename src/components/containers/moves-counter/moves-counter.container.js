import { createMovesCounter } from '../../elements/moves-counter/moves-counter.element.js';

export function createMovesCounterContainer() {
  const movesCounterElement = createMovesCounter();

  function render(game) {
    movesCounterElement.textContent = `Moves: ${game.gameState.movesCount}`;
  }

  return {
    movesCounterElement,
    render,
  };
}

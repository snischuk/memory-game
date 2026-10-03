import { getTotalPairsCount } from '../../../core/game/game.actions.js';
import { createMatchCounter } from '../../elements/match-counter/match-counter.element.js';

export function createMatchCounterContainer() {
  const matchCounterElement = createMatchCounter();

  function render(game) {
    const matchedPairsCount = game.gameState.matchedCardIds.length / 2;

    const totalPairsCount = getTotalPairsCount(game.cards);

    matchCounterElement.textContent = `Pairs: ${matchedPairsCount} / ${totalPairsCount}`;
  }

  return {
    matchCounterElement,
    render,
  };
}

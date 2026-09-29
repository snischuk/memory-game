import { createModal } from './modals.js';

export function createVictoryModal() {
  const titleElement = document.createElement('h2');

  titleElement.textContent = 'You won!';

  const movesCountElement = document.createElement('p');

  const newGameButtonElement = document.createElement('button');

  newGameButtonElement.textContent = 'New Game';

  const closeButtonElement = document.createElement('button');

  closeButtonElement.textContent = 'Close';

  const modalElement = createModal([
    titleElement,
    movesCountElement,
    newGameButtonElement,
    closeButtonElement,
  ]);

  return {
    modalElement,
    movesCountElement,
    newGameButtonElement,
    closeButtonElement,
  };
}

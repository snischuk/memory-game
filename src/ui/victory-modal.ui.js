import { createModal } from './modals.ui.js';

export function createVictoryModal() {
  const titleElement = document.createElement('h2');
  titleElement.textContent = 'You won!';

  const movesCountElement = document.createElement('p');

  const newGameButtonElement = document.createElement('button');
  newGameButtonElement.classList.add('button');
  newGameButtonElement.textContent = 'New Game';

  const closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('button');
  closeButtonElement.textContent = 'Close';

  const contentElement = document.createElement('div');

  contentElement.classList.add('victory-content');

  contentElement.append(
    titleElement,
    movesCountElement,
    newGameButtonElement,
    closeButtonElement,
  );

  const modalElement = createModal([contentElement]);

  return {
    modalElement,
    movesCountElement,
    newGameButtonElement,
    closeButtonElement,
  };
}

import './victory-modal.element.css';

import { createButton } from '../../ui/button/button.ui.js';
import { createHeading2 } from '../../ui/heading-2/heading-2.ui.js';
import { createModal } from '../../ui/modal/modal.ui.js';
import { createParagraph } from '../../ui/paragraph/paragraph.ui.js';

import { createElement } from '../../../utils/create-element.util.js';

export function createVictoryModal(messages) {
  const titleElement = createHeading2({
    classes: ['victory-heading-2'],
    textContent: messages.victory.title,
  });

  const movesCountElement = createParagraph({
    classes: ['victory-moves'],
  });

  const saveStatusElement = createParagraph({
    classes: ['victory-save-status'],
  });

  const newGameButtonElement = createButton({
    classes: ['victory-new-game-button'],
    textContent: messages.buttons.newGame,
  });

  const closeButtonElement = createButton({
    classes: ['victory-close-button'],
    textContent: messages.buttons.close,
  });

  const contentElement = createElement('div', {
    classes: ['victory-content'],
  });

  contentElement.append(
    titleElement,
    movesCountElement,
    saveStatusElement,
    newGameButtonElement,
    closeButtonElement,
  );

  const modalElement = createModal([contentElement], titleElement);

  return {
    modalElement,
    movesCountElement,
    saveStatusElement,
    newGameButtonElement,
    closeButtonElement,
  };
}

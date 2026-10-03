import './victory-modal.element.css';

import {
  CLOSE_BUTTON_TEXT,
  NEW_GAME_BUTTON_TEXT,
  VICTORY_TITLE_TEXT,
} from '../../../constants/ui.constants.js';

import { createButton } from '../../ui/button/button.ui.js';
import { createHeading2 } from '../../ui/heading-2/heading-2.ui.js';
import { createModal } from '../../ui/modal/modal.ui.js';
import { createParagraph } from '../../ui/paragraph/paragraph.ui.js';

import { createElement } from '../../../utils/dom.js';

export function createVictoryModal() {
  const titleElement = createHeading2({
    classes: ['victory-heading-2'],
    textContent: VICTORY_TITLE_TEXT,
  });

  const movesCountElement = createParagraph({
    classes: ['victory-moves'],
  });

  const newGameButtonElement = createButton({
    classes: ['victory-new-game-button'],
    textContent: NEW_GAME_BUTTON_TEXT,
  });

  const closeButtonElement = createButton({
    classes: ['victory-close-button'],
    textContent: CLOSE_BUTTON_TEXT,
  });

  const contentElement = createElement('div', {
    classes: ['victory-content'],
  });

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

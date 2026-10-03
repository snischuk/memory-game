import './leaderboard-modal.element.css';

import { CLOSE_BUTTON_TEXT } from '../../../constants/ui.constants.js';

import { createButton } from '../../ui/button/button.ui.js';
import { createHeading2 } from '../../ui/heading-2/heading-2.ui.js';
import { createModal } from '../../ui/modal/modal.ui.js';

export function createLeaderboardModal(leaderboardElement) {
  const titleElement = createHeading2({
    classes: ['leaderboard-modal-title'],
    textContent: 'Leaderboard',
  });

  const closeButtonElement = createButton({
    textContent: CLOSE_BUTTON_TEXT,
  });

  const contentElement = document.createElement('div');

  contentElement.classList.add('leaderboard-modal-content');

  contentElement.append(titleElement, leaderboardElement, closeButtonElement);

  const modalElement = createModal([contentElement]);

  return {
    modalElement,
    closeButtonElement,
  };
}

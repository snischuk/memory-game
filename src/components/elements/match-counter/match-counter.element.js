import './match-counter.element.css';

import { createParagraph } from '../../ui/paragraph/paragraph.ui.js';

export function createMatchCounter() {
  return createParagraph({
    classes: ['match-counter'],
  });
}

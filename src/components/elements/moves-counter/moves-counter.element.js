import './moves-counter.element.css';

import { createParagraph } from '../../ui/paragraph/paragraph.ui.js';

export function createMovesCounter() {
  return createParagraph({
    classes: ['moves-counter'],
  });
}

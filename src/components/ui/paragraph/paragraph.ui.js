import './paragraph.ui.css';

import { createElement } from '../../../utils/dom.js';

export function createParagraph({ classes = [], ...options } = {}) {
  return createElement('p', {
    ...options,
    classes: ['paragraph', ...classes],
  });
}

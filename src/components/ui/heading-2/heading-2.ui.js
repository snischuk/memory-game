import './heading-2.ui.css';

import { createElement } from '../../../utils/dom.js';

export function createHeading2({ classes = [], ...options } = {}) {
  return createElement('h2', {
    ...options,
    classes: ['heading-2', ...classes],
  });
}

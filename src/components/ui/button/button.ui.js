import './button.ui.css';

import { createElement } from '../../../utils/dom.js';

export function createButton({ classes = [], ...options } = {}) {
  return createElement('button', {
    ...options,
    classes: ['button', ...classes],
  });
}

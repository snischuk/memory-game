import './button.ui.css';

import { createElement } from '../../../utils/create-element.util.js';

export function createButton({ classes = [], ...options } = {}) {
  return createElement('button', {
    ...options,
    classes: ['button', ...classes],
  });
}

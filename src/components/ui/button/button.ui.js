import { createElement } from '@/utils/create-element.util.js'

import './button.ui.css'

export function createButton({ classes = [], ...options } = {}) {
  return createElement('button', {
    ...options,
    classes: ['button', ...classes]
  })
}

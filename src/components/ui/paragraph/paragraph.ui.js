import { createElement } from '@/utils/create-element.util.js'

import './paragraph.ui.css'

export function createParagraph({ classes = [], ...options } = {}) {
  return createElement('p', {
    ...options,
    classes: ['paragraph', ...classes]
  })
}

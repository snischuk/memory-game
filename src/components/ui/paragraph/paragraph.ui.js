import './paragraph.ui.css'

import { createElement } from '@/utils/create-element.util.js'

export function createParagraph({ classes = [], ...options } = {}) {
  return createElement('p', {
    ...options,
    classes: ['paragraph', ...classes]
  })
}

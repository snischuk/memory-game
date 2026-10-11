import './heading-2.ui.css'

import { createElement } from '@/utils/create-element.util.js'

export function createHeading2({ classes = [], ...options } = {}) {
  return createElement('h2', {
    ...options,
    classes: ['heading-2', ...classes]
  })
}

import './moves-counter.element.css'

import { createParagraph } from '@/components/ui/paragraph/paragraph.ui.js'

export function createMovesCounter() {
  return createParagraph({
    classes: ['moves-counter']
  })
}

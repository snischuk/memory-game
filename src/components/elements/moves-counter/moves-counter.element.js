import { createParagraph } from '@/components/ui/paragraph/paragraph.ui.js'

import './moves-counter.element.css'

export function createMovesCounter() {
  return createParagraph({
    classes: ['moves-counter']
  })
}

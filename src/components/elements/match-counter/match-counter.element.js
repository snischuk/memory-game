import { createParagraph } from '@/components/ui/paragraph/paragraph.ui.js'

import './match-counter.element.css'

export function createMatchCounter() {
  return createParagraph({
    classes: ['match-counter']
  })
}

import { createButton } from '@/components/ui/button/button.ui.js'
import { createHeading2 } from '@/components/ui/heading-2/heading-2.ui.js'
import { createModal } from '@/components/ui/modal/modal.ui.js'

import './leaderboard-modal.element.css'

export function createLeaderboardModal(leaderboardElement, messages) {
  const titleElement = createHeading2({
    classes: ['leaderboard-modal-title'],
    textContent: messages.leaderboard.title
  })

  const closeButtonElement = createButton({
    textContent: messages.buttons.close
  })

  const contentElement = document.createElement('div')

  contentElement.classList.add('leaderboard-modal-content')

  contentElement.append(titleElement, leaderboardElement, closeButtonElement)

  const modalElement = createModal([contentElement], titleElement)

  return {
    modalElement,
    closeButtonElement
  }
}

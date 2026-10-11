import './header.element.css'

import { createButton } from '../../ui/button/button.ui.js'

export function createHeader(messages) {
  const headerElement = document.createElement('header')

  headerElement.classList.add('header')

  const newGameButtonElement = createButton({
    textContent: messages.buttons.newGame
  })

  const audioButtonElement = createButton()

  const leaderboardButtonElement = createButton({
    textContent: messages.buttons.leaderboard
  })

  headerElement.append(
    newGameButtonElement,
    audioButtonElement,
    leaderboardButtonElement
  )

  return {
    headerElement,
    newGameButtonElement,
    audioButtonElement,
    leaderboardButtonElement
  }
}

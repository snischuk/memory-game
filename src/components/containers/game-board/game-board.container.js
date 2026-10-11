import { createGameBoardElement } from '../../elements/game-board/game-board.element.js'
import { createGameCard } from '../../elements/game-card/game-card.element.js'
import { areArraysEqual } from '../../../utils/are-arrays-equal.util.js'
import { updateGameCardElement } from '../../elements/game-card/update-game-card-element.util.js'

export function createGameBoardContainer(messages) {
  const gameBoardElement = createGameBoardElement()

  const cardElements = new Map()
  const previousCardsState = new Map()

  let previousCardOrder = []

  function render(cards, gameState) {
    const currentCardOrder = cards.map(card => card.id)

    const hasCardOrderChanged = !areArraysEqual(
      currentCardOrder,
      previousCardOrder
    )

    if (hasCardOrderChanged) {
      synchronizeCardOrder(cards)
      previousCardOrder = currentCardOrder
    }

    cards.forEach(card => {
      const isCardOpened = gameState.openedCardIds.includes(card.id)
      const isCardMatched = gameState.matchedCardIds.includes(card.id)

      let cardElement = cardElements.get(card.id)

      if (!cardElement) {
        cardElement = createGameCard(card, messages)
        cardElements.set(card.id, cardElement)
      }

      const previousCardState = previousCardsState.get(card.id)

      updateGameCardElement(
        cardElement,
        isCardOpened,
        isCardMatched,
        card.value,
        previousCardState,
        messages
      )

      previousCardsState.set(card.id, {
        isCardOpened,
        isCardMatched,
        cardValue: String(card.value)
      })
    })
  }

  function synchronizeCardOrder(cards) {
    const activeCardIds = new Set(cards.map(card => card.id))
    const orderedCardElements = []

    cards.forEach(card => {
      let cardElement = cardElements.get(card.id)

      if (!cardElement) {
        cardElement = createGameCard(card, messages)
        cardElements.set(card.id, cardElement)
      }

      orderedCardElements.push(cardElement)
    })

    gameBoardElement.replaceChildren(...orderedCardElements)

    cardElements.forEach((cardElement, cardId) => {
      if (!activeCardIds.has(cardId)) {
        cardElements.delete(cardId)
        previousCardsState.delete(cardId)
      }
    })
  }

  return {
    gameBoardElement,
    render
  }
}

import { CARDS_PER_TURN } from './game.constants.js'

export function checkCardCanBeOpened(openedCardIds, matchedCardIds, cardId) {
  const canOpenAnotherCard = openedCardIds.length < CARDS_PER_TURN
  const isCardAlreadyOpened = openedCardIds.includes(cardId)
  const isCardAlreadyMatched = matchedCardIds.includes(cardId)

  return canOpenAnotherCard && !isCardAlreadyOpened && !isCardAlreadyMatched
}

export function checkPair(firstCard, secondCard) {
  return firstCard.value === secondCard.value
}

export function checkGameComplete(matchedCardIds, cards) {
  return matchedCardIds.length === cards.length
}

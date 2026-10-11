import { CARDS_PER_PAIR, TURN_RESULT } from './game.constants.js'
import { checkPair } from './game.rules.js'

export function createCards(cardValues) {
  const cards = []

  cardValues.forEach(cardValue => {
    cards.push({ id: cards.length, value: cardValue })
    cards.push({ id: cards.length, value: cardValue })
  })

  return cards
}

export function shuffleCards(cards, random = Math.random) {
  const shuffledCards = [...cards]

  for (
    let currentIndex = shuffledCards.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(random() * (currentIndex + 1))

    ;[shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[currentIndex]
    ]
  }

  return shuffledCards
}

export function getCardById(cards, cardId) {
  return cards.find(card => card.id === cardId)
}

export function getOpenedCards(cards, openedCardIds) {
  const [firstCardId, secondCardId] = openedCardIds
  const firstCard = getCardById(cards, firstCardId)
  const secondCard = getCardById(cards, secondCardId)

  return {
    firstCard,
    secondCard
  }
}

export function getTotalPairsCount(cards) {
  return cards.length / CARDS_PER_PAIR
}

export function getMatchedPairsCount(matchedCardIds) {
  return matchedCardIds.length / CARDS_PER_PAIR
}

export function getTurnResult(firstCard, secondCard) {
  if (checkPair(firstCard, secondCard)) {
    return TURN_RESULT.MATCHED
  }

  return TURN_RESULT.NOT_MATCHED
}

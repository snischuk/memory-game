import './game-card.element.css';

import { createElement } from '../../../utils/create-element.util.js';

export function createGameCard(card, messages) {
  const cardBackElement = createElement('div', {
    classes: ['card-face', 'card-back'],
    textContent: messages.game.cardBack,
  });

  const cardFrontElement = createElement('div', {
    classes: ['card-face', 'card-front'],
    textContent: card.value,
  });

  const cardInnerElement = createElement('div', {
    classes: ['card-inner'],
    children: [cardBackElement, cardFrontElement],
  });

  return createElement('button', {
    classes: ['card'],
    dataset: {
      cardId: card.id,
    },
    children: [cardInnerElement],
  });
}

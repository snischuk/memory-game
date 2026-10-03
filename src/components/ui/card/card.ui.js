import './card.ui.css';

import { createElement } from '../../../utils/dom.js';

export function createCard(card) {
  const cardBackElement = createElement('div', {
    classes: ['card-face', 'card-back'],
    textContent: '?',
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

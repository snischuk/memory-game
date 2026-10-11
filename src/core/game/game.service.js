import {
  createCards,
  shuffleCards,
  getOpenedCards,
  getTurnResult,
} from './game.logic.js';

import { playTurn, selectCard } from './game.actions.js';
import { createGameState } from './game.state.js';
import { CARDS_PER_TURN } from './game.constants.js';

export class GameService {
  constructor(random = Math.random) {
    this.random = random;
  }

  createGame(cardValues) {
    const cards = createCards(cardValues);
    const shuffledCards = shuffleCards(cards, this.random);
    const gameState = createGameState();

    return {
      cards: shuffledCards,
      gameState,
    };
  }

  handleCardSelection(game, cardId) {
    const gameState = selectCard(game.gameState, cardId);

    const updatedGame = {
      ...game,
      gameState,
    };

    const hasTwoOpenedCards = gameState.openedCardIds.length === CARDS_PER_TURN;

    if (!hasTwoOpenedCards) {
      return {
        game: updatedGame,
        turnResult: null,
      };
    }

    const { firstCard, secondCard } = getOpenedCards(
      game.cards,
      gameState.openedCardIds,
    );

    return {
      game: updatedGame,
      turnResult: getTurnResult(firstCard, secondCard),
    };
  }

  finishTurn(game, turnResult) {
    const gameState = playTurn(game.gameState, game.cards, turnResult);

    return {
      ...game,
      gameState,
    };
  }
}

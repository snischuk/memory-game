import { selectCard, getOpenedCards, getTurnResult, playTurn } from './game.js';

export function handleCardSelection(game, cardId) {
  const gameState = selectCard(game.gameState, cardId);

  const updatedGame = {
    ...game,
    gameState,
  };

  const hasTwoOpenedCards = gameState.openedCardIds.length === 2;

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

  const turnResult = getTurnResult(firstCard, secondCard);

  return {
    game: updatedGame,
    turnResult,
  };
}

export function finishTurn(game, turnResult) {
  const gameState = playTurn(game.gameState, game.cards, turnResult);

  return {
    ...game,
    gameState,
  };
}

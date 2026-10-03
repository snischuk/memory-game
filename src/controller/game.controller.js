import {
  createGame,
  handleCardSelection,
  finishTurn,
} from '../core/game/game.service.js';

import {
  TURN_RESULT,
  MISMATCH_CLOSE_DELAY,
} from '../core/game/game.constants.js';

export function createGameController({
  cardValues,
  renderGame,
  onGameComplete,
  onCardFlip,
  onCardFlipBack,
}) {
  let currentGame = createGame(cardValues);
  let isInputLocked = false;
  let mismatchCloseTimerId = null;

  renderGame(currentGame);

  function handleCardClick(cardId) {
    if (isInputLocked) {
      return;
    }

    const { game: updatedGame, turnResult } = handleCardSelection(
      currentGame,
      cardId,
    );

    currentGame = updatedGame;
    renderGame(currentGame);
    onCardFlip();

    if (!turnResult) {
      return;
    }

    if (turnResult === TURN_RESULT.MATCHED) {
      finishMatchedTurn();
      return;
    }

    startMismatchTimer();
  }

  function finishMatchedTurn() {
    currentGame = finishTurn(currentGame, TURN_RESULT.MATCHED);

    renderGame(currentGame);

    if (currentGame.gameState.isGameComplete) {
      onGameComplete(currentGame);
    }
  }

  function startMismatchTimer() {
    isInputLocked = true;

    mismatchCloseTimerId = setTimeout(() => {
      currentGame = finishTurn(currentGame, TURN_RESULT.NOT_MATCHED);
      renderGame(currentGame);
      onCardFlipBack();

      mismatchCloseTimerId = null;
      isInputLocked = false;
    }, MISMATCH_CLOSE_DELAY);
  }

  function startNewGame() {
    clearTimeout(mismatchCloseTimerId);

    mismatchCloseTimerId = null;
    isInputLocked = false;

    currentGame = createGame(cardValues);

    renderGame(currentGame);
  }

  return {
    handleCardClick,
    startNewGame,
  };
}

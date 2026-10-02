import { getTotalPairsCount } from '../core/game/game.actions.js';
import { createHeader } from './header.ui.js';
import { createGameBoard, renderCards } from './cards.ui.js';
import {
  createCounters,
  renderMovesCount,
  renderMatchedPairsCount,
} from './counters.ui.js';
import { createVictoryModal } from './victory-modal.ui.js';
import {
  createLeaderboardModal,
  renderLeaderboard,
} from './leaderboard-modal.ui.js';
import { openModal, closeModal } from './modals.ui.js';

export function createGameUI() {
  const {
    headerElement,
    newGameButtonElement: newGameHeaderButtonElement,
    leaderboardButtonElement,
  } = createHeader();

  const gameBoardElement = createGameBoard();

  const { movesCountElement, matchedPairsCountElement } = createCounters();

  const {
    modalElement: victoryModalElement,
    movesCountElement: victoryMovesCountElement,
    newGameButtonElement,
    closeButtonElement: closeVictoryButtonElement,
  } = createVictoryModal();

  const {
    modalElement: leaderboardModalElement,
    resultsElement: leaderboardResultsElement,
    closeButtonElement: closeLeaderboardButtonElement,
  } = createLeaderboardModal();

  const mainElement = document.createElement('main');
  mainElement.classList.add('main');

  mainElement.append(
    gameBoardElement,
    movesCountElement,
    matchedPairsCountElement,
  );

  document.body.prepend(headerElement);

  document.body.append(
    mainElement,
    victoryModalElement,
    leaderboardModalElement,
  );

  function renderGame(game) {
    const totalPairsCount = getTotalPairsCount(game.cards);

    renderCards(gameBoardElement, game.cards, game.gameState);

    renderMovesCount(movesCountElement, game.gameState.movesCount);

    renderMatchedPairsCount(
      matchedPairsCountElement,
      game.gameState.matchedCardIds,
      totalPairsCount,
    );
  }

  function showVictoryModal(movesCount) {
    victoryMovesCountElement.textContent = `Moves: ${movesCount}`;

    openModal(victoryModalElement);
  }

  function closeVictoryModal() {
    closeModal(victoryModalElement);
  }

  function showLeaderboard(gameResults) {
    renderLeaderboard(leaderboardResultsElement, gameResults);

    openModal(leaderboardModalElement);
  }

  function closeLeaderboard() {
    closeModal(leaderboardModalElement);
  }

  return {
    renderGame,
    showVictoryModal,
    closeVictoryModal,
    showLeaderboard,
    closeLeaderboard,
    newGameHeaderButtonElement,
    newGameButtonElement,
    leaderboardButtonElement,
    closeVictoryButtonElement,
    closeLeaderboardButtonElement,
    gameBoardElement,
  };
}

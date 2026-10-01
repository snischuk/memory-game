import { getTotalPairsCount } from './game.js';

import { createHeader } from './ui/header.js';

import { createGameBoard, renderCards } from './ui/cards.js';

import {
  createCounters,
  renderMovesCount,
  renderMatchedPairsCount,
} from './ui/counters.js';

import { createVictoryModal } from './ui/victory-modal.js';

import {
  createLeaderboardModal,
  renderLeaderboard,
} from './ui/leaderboard-modal.js';

import { openModal, closeModal } from './ui/modals.js';

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

  document.body.prepend(headerElement);

  document.body.append(
    gameBoardElement,
    movesCountElement,
    matchedPairsCountElement,
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

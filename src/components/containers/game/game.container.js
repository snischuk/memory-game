import './game.container.css';

import { createHeader } from '../../elements/header/header.element.js';

import { createMovesCounterContainer } from '../moves-counter/moves-counter.container.js';
import { createMatchCounterContainer } from '../match-counter/match-counter.container.js';

import { createVictoryModal } from '../../elements/victory-modal/victory-modal.element.js';
import { createGameBoard } from '../../elements/game-board/game-board.element.js';
import { createLeaderboard } from '../../elements/leaderboard/leaderboard.element.js';
import { createLeaderboardModal } from '../../elements/leaderboard-modal/leaderboard-modal.element.js';

import { openModal, closeModal } from '../../ui/modal/modal.ui.js';

export function createGameContainer() {
  const {
    headerElement,
    newGameButtonElement: newGameHeaderButtonElement,
    leaderboardButtonElement,
    audioButtonElement,
  } = createHeader();

  const { gameBoardElement, render: renderGameBoard } = createGameBoard();

  const { movesCounterElement, render: renderMovesCounter } =
    createMovesCounterContainer();

  const { matchCounterElement, render: renderMatchCounter } =
    createMatchCounterContainer();

  const {
    modalElement: victoryModalElement,
    movesCountElement: victoryMovesCountElement,
    newGameButtonElement,
    closeButtonElement: closeVictoryButtonElement,
  } = createVictoryModal();

  const { leaderboardElement, render: renderLeaderboard } = createLeaderboard();

  const {
    modalElement: leaderboardModalElement,
    closeButtonElement: closeLeaderboardButtonElement,
  } = createLeaderboardModal(leaderboardElement);

  const mainElement = document.createElement('main');

  mainElement.classList.add('main');

  mainElement.append(
    gameBoardElement,
    movesCounterElement,
    matchCounterElement,
  );

  document.body.prepend(headerElement);

  document.body.append(
    mainElement,
    victoryModalElement,
    leaderboardModalElement,
  );

  function renderGame(game) {
    renderGameBoard(game.cards, game.gameState);
    renderMovesCounter(game);
    renderMatchCounter(game);
  }

  function showVictoryModal(movesCount) {
    victoryMovesCountElement.textContent = `Moves: ${movesCount}`;

    openModal(victoryModalElement);
  }

  function closeVictoryModal() {
    closeModal(victoryModalElement);
  }

  function showLeaderboard(gameResults) {
    renderLeaderboard(gameResults);

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
    audioButtonElement,
    newGameButtonElement,
    leaderboardButtonElement,
    closeVictoryButtonElement,
    closeLeaderboardButtonElement,
    gameBoardElement,
  };
}

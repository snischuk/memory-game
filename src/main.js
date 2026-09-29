import { createGameController } from './game-controller.js';

import { CARD_VALUES } from './constants.js';

import { createGameUI } from './game-ui.js';

import { createLeaderboardController } from './leaderboard-controller.js';

import { setupGameUIEvents } from './game-ui-events.js';

const gameUI = createGameUI();

const leaderboardController = createLeaderboardController();

function finishGame(completedGame) {
  const movesCount = completedGame.gameState.movesCount;

  leaderboardController.saveGameResult(movesCount);

  gameUI.showVictoryModal(movesCount);
}

const gameController = createGameController({
  cardValues: CARD_VALUES,
  renderGame: gameUI.renderGame,
  onGameComplete: finishGame,
});

setupGameUIEvents({
  gameUI,
  gameController,
  leaderboardController,
});

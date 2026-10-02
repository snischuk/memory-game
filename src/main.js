import './styles.css';
import { createGameController } from './controller/game.controller.js';
import { createLeaderboardController } from './controller/leaderboard.controller.js';
import { CARD_VALUES } from './core/game/game.constants.js';
import { setupGameUIEvents } from './events/game.events.js';
import { createGameUI } from './ui/game.ui.js';

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

import './styles.css';
import { createGameController } from './controller/game.controller.js';
import { createLeaderboardController } from './controller/leaderboard.controller.js';
import { CARD_VALUES } from './core/game/game.constants.js';
import { setupGameUIEvents } from './events/game.events.js';
import {
  playCardFlipBackSound,
  playCardFlipSound,
  startBackgroundMusic,
} from './audio/game.audio.js';
import { createGameUI } from './ui/game.ui.js';

const gameUI = createGameUI();
const leaderboardController = createLeaderboardController();

document.addEventListener(
  'click',
  () => {
    startBackgroundMusic();
  },
  { once: true },
);

function finishGame(completedGame) {
  const movesCount = completedGame.gameState.movesCount;
  leaderboardController.saveGameResultToLeaderboard(movesCount);
  gameUI.showVictoryModal(movesCount);
}

const gameController = createGameController({
  cardValues: CARD_VALUES,
  renderGame: gameUI.renderGame,
  onGameComplete: finishGame,
  onCardFlip: playCardFlipSound,
  onCardFlipBack: playCardFlipBackSound,
});

setupGameUIEvents({
  gameUI,
  gameController,
  leaderboardController,
});

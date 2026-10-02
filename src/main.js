import './styles.css';
import musicFile from './assets/breaking_bad.mp3';
import { createGameController } from './controller/game.controller.js';
import { createLeaderboardController } from './controller/leaderboard.controller.js';
import { CARD_VALUES } from './core/game/game.constants.js';
import { setupGameUIEvents } from './events/game.events.js';
import { createGameUI } from './ui/game.ui.js';

const gameUI = createGameUI();

const leaderboardController = createLeaderboardController();

const backgroundMusic = new Audio(musicFile);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

document.addEventListener(
  'click',
  () => {
    backgroundMusic.play();
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
});

setupGameUIEvents({
  gameUI,
  gameController,
  leaderboardController,
});

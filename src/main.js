import './styles/index.css';

import { createGameController } from './controller/game.controller.js';
import { createLeaderboardController } from './controller/leaderboard.controller.js';

import { CARD_VALUES } from './core/game/game.constants.js';

import { setupGameContainerEvents } from './events/game.events.js';

import {
  getAudioMutedState,
  playCardFlipBackSound,
  playCardFlipSound,
  startBackgroundMusic,
  toggleAudio,
} from './audio/game.audio.js';

import { createGameContainer } from './components/containers/game/game.container.js';

const gameContainer = createGameContainer();

const leaderboardController = createLeaderboardController();

function finishGame(completedGame) {
  const movesCount = completedGame.gameState.movesCount;

  leaderboardController.saveGameResultToLeaderboard(movesCount);

  gameContainer.showVictoryModal(movesCount);
}

const gameController = createGameController({
  cardValues: CARD_VALUES,
  renderGame: gameContainer.renderGame,
  onGameComplete: finishGame,
  onCardFlip: playCardFlipSound,
  onCardFlipBack: playCardFlipBackSound,
});

setupGameContainerEvents({
  gameContainer,
  gameController,
  leaderboardController,
  startBackgroundMusic,
  toggleAudio,
  getAudioMutedState,
});

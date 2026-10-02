import {
  createGameResult,
  addGameResult,
  sortGameResults,
  getTopGameResults,
} from './leaderboard.actions.js';
import { localStorageService } from '../../utils/local-storage.js';

const LEADERBOARD_STORAGE_KEY = 'memory-game-leaderboard-results';

export function saveGameResults(gameResults) {
  localStorageService.save(LEADERBOARD_STORAGE_KEY, gameResults);
}

export function loadGameResults() {
  return localStorageService.load(LEADERBOARD_STORAGE_KEY, []);
}

export function saveGameResult(movesCount) {
  const gameResult = createGameResult(movesCount);
  const savedGameResults = loadGameResults();
  const updatedGameResults = addGameResult(savedGameResults, gameResult);
  const sortedGameResults = sortGameResults(updatedGameResults);

  saveGameResults(sortedGameResults);

  return sortedGameResults;
}

export function getLeaderboard() {
  const gameResults = loadGameResults();
  const sortedGameResults = sortGameResults(gameResults);

  return getTopGameResults(sortedGameResults);
}

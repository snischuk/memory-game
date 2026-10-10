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
  const gameResults = localStorageService.load(LEADERBOARD_STORAGE_KEY, []);

  if (!Array.isArray(gameResults)) {
    return [];
  }

  return gameResults.filter(isValidGameResult);
}

function isValidGameResult(gameResult) {
  return (
    gameResult !== null &&
    typeof gameResult === 'object' &&
    Number.isFinite(gameResult.movesCount) &&
    gameResult.movesCount >= 0 &&
    typeof gameResult.playedAt === 'string' &&
    !Number.isNaN(Date.parse(gameResult.playedAt))
  );
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

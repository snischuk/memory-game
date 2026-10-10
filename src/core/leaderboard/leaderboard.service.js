import {
  createGameResult,
  addGameResult,
  sortGameResults,
  getTopGameResults,
} from './leaderboard.actions.js';
import { memoryGameStorageService } from '../../utils/local-storage.js';

export function saveGameResults(gameResults) {
  return memoryGameStorageService.update({ leaderboard: gameResults });
}

export function loadGameResults() {
  const { leaderboard: gameResults } = memoryGameStorageService.load();

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
  const isSaved = saveGameResults(sortedGameResults);

  return {
    gameResults: sortedGameResults,
    isSaved,
  };
}

export function getLeaderboard() {
  const gameResults = loadGameResults();
  const sortedGameResults = sortGameResults(gameResults);

  return getTopGameResults(sortedGameResults);
}

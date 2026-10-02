import {
  createGameResult,
  addGameResult,
  sortGameResults,
  getTopGameResults,
} from './leaderboard.actions.js';

const leaderboardStorageKey = 'memoryGameResults';

export function saveGameResults(gameResults) {
  localStorage.setItem(leaderboardStorageKey, JSON.stringify(gameResults));
}

export function loadGameResults() {
  const savedGameResults = localStorage.getItem(leaderboardStorageKey);

  if (!savedGameResults) {
    return [];
  }

  try {
    return JSON.parse(savedGameResults);
  } catch {
    return [];
  }
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

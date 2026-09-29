import { MAX_LEADERBOARD_RESULTS } from './constants.js';

const leaderboardStorageKey = 'memoryGameResults';

export function createGameResult(movesCount) {
  return {
    movesCount,
    playedAt: new Date().toISOString(),
  };
}

export function addGameResult(gameResults, gameResult) {
  return [...gameResults, gameResult];
}

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

export function sortGameResults(gameResults) {
  return [...gameResults].sort((firstGameResult, secondGameResult) => {
    if (firstGameResult.movesCount !== secondGameResult.movesCount) {
      return firstGameResult.movesCount - secondGameResult.movesCount;
    }

    return firstGameResult.playedAt.localeCompare(secondGameResult.playedAt);
  });
}

export function getTopGameResults(gameResults) {
  return gameResults.slice(0, MAX_LEADERBOARD_RESULTS);
}

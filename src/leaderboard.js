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

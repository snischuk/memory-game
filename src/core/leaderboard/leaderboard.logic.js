import { MAX_LEADERBOARD_RESULTS } from './leaderboard.constants.js';

export function createGameResult(
  movesCount,
  playedAt = new Date().toISOString(),
) {
  return {
    movesCount,
    playedAt,
  };
}

export function sortGameResults(gameResults) {
  return [...gameResults].sort((firstGameResult, secondGameResult) => {
    if (firstGameResult.movesCount !== secondGameResult.movesCount) {
      return firstGameResult.movesCount - secondGameResult.movesCount;
    }

    return (
      Date.parse(firstGameResult.playedAt) -
      Date.parse(secondGameResult.playedAt)
    );
  });
}

export function getTopGameResults(gameResults) {
  return gameResults.slice(0, MAX_LEADERBOARD_RESULTS);
}

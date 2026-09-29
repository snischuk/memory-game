import {
  createGameResult,
  addGameResult,
  saveGameResults,
  loadGameResults,
  sortGameResults,
  getTopGameResults,
} from './leaderboard.js';

export function createLeaderboardController() {
  let gameResults = loadGameResults();

  function saveGameResult(movesCount) {
    const gameResult = createGameResult(movesCount);

    gameResults = addGameResult(gameResults, gameResult);

    saveGameResults(gameResults);
  }

  function getLeaderboardResults() {
    const sortedGameResults = sortGameResults(gameResults);

    return getTopGameResults(sortedGameResults);
  }

  return {
    saveGameResult,
    getLeaderboardResults,
  };
}

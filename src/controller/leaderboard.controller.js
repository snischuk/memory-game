import {
  saveGameResult,
  getLeaderboard,
} from '../core/leaderboard/leaderboard.service.js';

export function createLeaderboardController() {
  function saveGameResultToLeaderboard(movesCount) {
    saveGameResult(movesCount);
  }

  function getLeaderboardResults() {
    return getLeaderboard();
  }

  return {
    saveGameResultToLeaderboard,
    getLeaderboardResults,
  };
}

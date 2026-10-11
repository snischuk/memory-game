export function createLeaderboardController(leaderboardService) {
  function saveGameResultToLeaderboard(movesCount) {
    return leaderboardService.saveGameResult(movesCount)
  }

  function getLeaderboardResults() {
    return leaderboardService.getLeaderboard()
  }

  return {
    saveGameResultToLeaderboard,
    getLeaderboardResults
  }
}

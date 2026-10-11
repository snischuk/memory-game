import {
  createGameResult,
  sortGameResults,
  getTopGameResults
} from '../core/leaderboard/leaderboard.logic.js'
import { addGameResult } from '../core/leaderboard/leaderboard.actions.js'
import { isValidGameResult } from '../core/leaderboard/is-valid-game-result.util.js'

export class LeaderboardService {
  constructor(storageService, now = () => new Date()) {
    this.storageService = storageService
    this.now = now
  }

  saveGameResults(gameResults) {
    return this.storageService.update({
      leaderboard: getTopGameResults(gameResults)
    })
  }

  loadGameResults() {
    const { leaderboard: gameResults } = this.storageService.load()

    if (!Array.isArray(gameResults)) {
      return []
    }

    return gameResults.filter(isValidGameResult)
  }

  saveGameResult(movesCount) {
    const gameResult = createGameResult(movesCount, this.now().toISOString())
    const savedGameResults = this.loadGameResults()
    const updatedGameResults = addGameResult(savedGameResults, gameResult)
    const sortedGameResults = getTopGameResults(
      sortGameResults(updatedGameResults)
    )
    const isSaved = this.saveGameResults(sortedGameResults)

    return {
      gameResults: sortedGameResults,
      isSaved
    }
  }

  getLeaderboard() {
    const gameResults = this.loadGameResults()
    const sortedGameResults = sortGameResults(gameResults)

    return getTopGameResults(sortedGameResults)
  }
}

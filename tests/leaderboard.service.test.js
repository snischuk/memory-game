import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isValidGameResult } from '../src/core/leaderboard/is-valid-game-result.util.js'
import { sortGameResults } from '../src/core/leaderboard/leaderboard.logic.js'
import { LeaderboardService } from '../src/services/leaderboard.service.js'

describe('leaderboard logic', () => {
  it('sorts equal scores by chronological instant', () => {
    const results = [
      { movesCount: 5, playedAt: '2026-01-01T02:00:00+02:00' },
      { movesCount: 5, playedAt: '2026-01-01T00:30:00Z' }
    ]

    assert.deepEqual(sortGameResults(results), [results[0], results[1]])
  })

  it('rejects fractional move counts', () => {
    assert.equal(
      isValidGameResult({ movesCount: 4.5, playedAt: '2026-01-01T00:00:00Z' }),
      false
    )
  })

  it('persists only the best ten results', () => {
    let savedResults = []
    const storageService = {
      load: () => ({ leaderboard: savedResults }),
      update: ({ leaderboard }) => {
        savedResults = leaderboard
        return true
      }
    }
    const service = new LeaderboardService(
      storageService,
      () => new Date('2026-01-01T00:00:00Z')
    )

    for (let movesCount = 20; movesCount >= 1; movesCount -= 1) {
      service.saveGameResult(movesCount)
    }

    assert.equal(savedResults.length, 10)
    assert.equal(savedResults[0].movesCount, 1)
    assert.equal(savedResults[9].movesCount, 10)
    assert.equal(service.getLeaderboard().length, 10)
  })
})

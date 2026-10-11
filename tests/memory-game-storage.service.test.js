import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { MemoryGameStorageService } from '../src/services/memory-game-storage.service.js'

class InMemoryStorageService {
  values = new Map()
  shouldFailSet = false

  read(key) {
    if (!this.values.has(key)) {
      return { success: true, exists: false, value: undefined }
    }

    return { success: true, exists: true, value: this.values.get(key) }
  }

  set(key, value) {
    if (this.shouldFailSet) {
      return false
    }

    this.values.set(key, value)
    return true
  }

  remove(key) {
    this.values.delete(key)
    return true
  }
}

describe('MemoryGameStorageService', () => {
  it('migrates legacy values and removes their keys after saving the new object', () => {
    const storage = new InMemoryStorageService()
    const legacyResults = [
      { movesCount: 9, playedAt: '2026-01-01T00:00:00.000Z' }
    ]

    storage.values.set('memory-game-leaderboard-results', legacyResults)
    storage.values.set('memory-game-audio-muted', true)

    const service = new MemoryGameStorageService(storage)
    const data = service.load()

    assert.equal(data.version, 1)
    assert.deepEqual(data.leaderboard, legacyResults)
    assert.equal(data.settings.audioMuted, true)
    assert.equal(storage.values.has('memory-game'), true)
    assert.equal(storage.values.has('memory-game-leaderboard-results'), false)
    assert.equal(storage.values.has('memory-game-audio-muted'), false)
  })

  it('keeps legacy keys when saving the migrated object fails', () => {
    const storage = new InMemoryStorageService()

    storage.values.set('memory-game-audio-muted', true)
    storage.shouldFailSet = true

    const service = new MemoryGameStorageService(storage)

    assert.equal(service.update({ leaderboard: [] }), false)
    assert.equal(storage.values.has('memory-game-audio-muted'), true)
    assert.equal(storage.values.has('memory-game'), false)
  })

  it('does not update old-version data when persisting its migration fails', () => {
    const storage = new InMemoryStorageService()

    storage.values.set('memory-game', {
      version: 0,
      leaderboard: [],
      settings: { audioMuted: false }
    })
    storage.shouldFailSet = true

    const service = new MemoryGameStorageService(storage)

    assert.equal(service.update({ settings: { audioMuted: true } }), false)
    assert.equal(storage.values.get('memory-game').settings.audioMuted, false)
  })

  it('preserves other stored data when updating a nested setting', () => {
    const storage = new InMemoryStorageService()
    const leaderboard = [
      { movesCount: 6, playedAt: '2026-01-01T00:00:00.000Z' }
    ]

    storage.values.set('memory-game', {
      version: 1,
      leaderboard,
      settings: { audioMuted: false }
    })

    const service = new MemoryGameStorageService(storage)

    assert.equal(service.update({ settings: { audioMuted: true } }), true)
    assert.deepEqual(service.load().leaderboard, leaderboard)
    assert.equal(service.load().settings.audioMuted, true)
  })
})

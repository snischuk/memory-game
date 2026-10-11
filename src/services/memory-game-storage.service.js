const MEMORY_GAME_KEY = 'memory-game'
const LEGACY_LEADERBOARD_KEY = 'memory-game-leaderboard-results'
const LEGACY_AUDIO_MUTED_KEY = 'memory-game-audio-muted'
const INITIAL_STORAGE_VERSION = 0
const STORAGE_VERSION = INITIAL_STORAGE_VERSION + 1

function createDefaultData() {
  return {
    version: STORAGE_VERSION,
    leaderboard: [],
    settings: {
      audioMuted: false
    }
  }
}

function normalizeData(data) {
  const defaults = createDefaultData()

  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return defaults
  }

  return {
    ...defaults,
    ...data,
    version: STORAGE_VERSION,
    leaderboard: Array.isArray(data.leaderboard) ? data.leaderboard : [],
    settings: {
      ...defaults.settings,
      ...(data.settings && typeof data.settings === 'object'
        ? data.settings
        : {}),
      audioMuted:
        typeof data.settings?.audioMuted === 'boolean'
          ? data.settings.audioMuted
          : defaults.settings.audioMuted
    }
  }
}

const DATA_MIGRATIONS = {
  [INITIAL_STORAGE_VERSION]: data => ({
    ...data,
    version: data.version + 1
  })
}

function migrateData(data) {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return { success: false, data: createDefaultData() }
  }

  let version = data.version ?? INITIAL_STORAGE_VERSION

  if (
    !Number.isInteger(version) ||
    version < INITIAL_STORAGE_VERSION ||
    version > STORAGE_VERSION
  ) {
    return { success: false, data: createDefaultData() }
  }

  let migratedData = { ...data, version }

  while (version < STORAGE_VERSION) {
    const migrate = DATA_MIGRATIONS[version]

    if (!migrate) {
      return { success: false, data: createDefaultData() }
    }

    migratedData = migrate(migratedData)
    version = migratedData.version
  }

  return {
    success: true,
    data: normalizeData(migratedData),
    wasMigrated: data.version !== STORAGE_VERSION
  }
}

export class MemoryGameStorageService {
  constructor(storageService) {
    this.storageService = storageService
  }

  load() {
    return this.#readData().data
  }

  update(updates) {
    const { data, canUpdate } = this.#readData()

    if (!canUpdate) {
      return false
    }

    const updatedData = normalizeData({
      ...data,
      ...updates,
      settings: {
        ...data.settings,
        ...updates.settings
      }
    })

    return this.storageService.set(MEMORY_GAME_KEY, updatedData)
  }

  #readData() {
    const storedData = this.storageService.read(MEMORY_GAME_KEY)

    if (!storedData.success) {
      return { data: createDefaultData(), canUpdate: false }
    }

    if (storedData.exists) {
      const migrationResult = migrateData(storedData.value)

      if (!migrationResult.success) {
        return { data: migrationResult.data, canUpdate: false }
      }

      if (migrationResult.wasMigrated) {
        const wasSaved = this.storageService.set(
          MEMORY_GAME_KEY,
          migrationResult.data
        )

        return {
          data: migrationResult.data,
          canUpdate: wasSaved
        }
      }

      return { data: migrationResult.data, canUpdate: true }
    }

    return this.#migrateLegacyData()
  }

  #migrateLegacyData() {
    const legacyLeaderboard = this.storageService.read(LEGACY_LEADERBOARD_KEY)
    const legacyAudioMuted = this.storageService.read(LEGACY_AUDIO_MUTED_KEY)

    if (legacyLeaderboard.exists === null || legacyAudioMuted.exists === null) {
      return { data: createDefaultData(), canUpdate: false }
    }

    const data = createDefaultData()

    if (legacyLeaderboard.success && Array.isArray(legacyLeaderboard.value)) {
      data.leaderboard = legacyLeaderboard.value
    }

    if (
      legacyAudioMuted.success &&
      typeof legacyAudioMuted.value === 'boolean'
    ) {
      data.settings.audioMuted = legacyAudioMuted.value
    }

    const hasLegacyData = legacyLeaderboard.exists || legacyAudioMuted.exists

    const wasSaved =
      !hasLegacyData || this.storageService.set(MEMORY_GAME_KEY, data)

    if (hasLegacyData && wasSaved) {
      if (legacyLeaderboard.success && legacyLeaderboard.exists) {
        this.storageService.remove(LEGACY_LEADERBOARD_KEY)
      }

      if (legacyAudioMuted.success && legacyAudioMuted.exists) {
        this.storageService.remove(LEGACY_AUDIO_MUTED_KEY)
      }
    }

    return { data, canUpdate: wasSaved }
  }
}

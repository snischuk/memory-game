const MEMORY_GAME_STORAGE_KEY = 'memory-game';
const LEADERBOARD_STORAGE_KEY = 'memory-game-leaderboard-results';
const AUDIO_MUTED_STORAGE_KEY = 'memory-game-audio-muted';
const STORAGE_VERSION = 1;

function createDefaultData() {
  return {
    version: STORAGE_VERSION,
    leaderboard: [],
    settings: {
      audioMuted: false,
    },
  };
}

function normalizeData(data) {
  const defaultData = createDefaultData();

  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return defaultData;
  }

  return {
    ...defaultData,
    ...data,
    version: STORAGE_VERSION,
    leaderboard: Array.isArray(data.leaderboard) ? data.leaderboard : [],
    settings: {
      ...defaultData.settings,
      ...(data.settings && typeof data.settings === 'object'
        ? data.settings
        : {}),
      audioMuted:
        typeof data.settings?.audioMuted === 'boolean'
          ? data.settings.audioMuted
          : defaultData.settings.audioMuted,
    },
  };
}

function readLegacyValue(key, defaultValue) {
  try {
    const storedValue = localStorage.getItem(key);

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  } catch {
    return defaultValue;
  }
}

function readData() {
  try {
    const storedValue = localStorage.getItem(MEMORY_GAME_STORAGE_KEY);

    if (storedValue !== null) {
      return normalizeData(JSON.parse(storedValue));
    }

    const data = createDefaultData();
    const legacyLeaderboard = readLegacyValue(LEADERBOARD_STORAGE_KEY, []);
    const legacyAudioMuted = readLegacyValue(AUDIO_MUTED_STORAGE_KEY, false);
    const hasLegacyData =
      localStorage.getItem(LEADERBOARD_STORAGE_KEY) !== null ||
      localStorage.getItem(AUDIO_MUTED_STORAGE_KEY) !== null;

    if (Array.isArray(legacyLeaderboard)) {
      data.leaderboard = legacyLeaderboard;
    }

    if (typeof legacyAudioMuted === 'boolean') {
      data.settings.audioMuted = legacyAudioMuted;
    }

    if (hasLegacyData && saveData(data)) {
      removeLegacyData();
    }

    return data;
  } catch {
    return createDefaultData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(MEMORY_GAME_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function removeLegacyData() {
  try {
    localStorage.removeItem(LEADERBOARD_STORAGE_KEY);
    localStorage.removeItem(AUDIO_MUTED_STORAGE_KEY);
  } catch {
    return false;
  }
}

export const memoryGameStorageService = {
  load() {
    return readData();
  },

  update(updates) {
    const data = readData();
    const updatedData = normalizeData({
      ...data,
      ...updates,
      settings: {
        ...data.settings,
        ...updates.settings,
      },
    });

    return saveData(updatedData);
  },
};

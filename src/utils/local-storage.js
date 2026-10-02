export const localStorageService = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  load(key, defaultValue) {
    try {
      const storedValue = localStorage.getItem(key);

      if (!storedValue) {
        return defaultValue;
      }

      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

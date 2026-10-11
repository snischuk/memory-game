export class LocalStorageService {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
  }

  read(key) {
    let storedValue;

    try {
      storedValue = this.storage.getItem(key);
    } catch {
      return { success: false, exists: null, value: undefined };
    }

    if (storedValue === null) {
      return { success: true, exists: false, value: undefined };
    }

    try {
      return {
        success: true,
        exists: true,
        value: JSON.parse(storedValue),
      };
    } catch {
      return { success: false, exists: true, value: undefined };
    }
  }

  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);

      if (serializedValue === undefined) {
        return false;
      }

      this.storage.setItem(key, serializedValue);
      return true;
    } catch {
      return false;
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
}

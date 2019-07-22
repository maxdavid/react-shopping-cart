import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    let item = window.localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }
    return initialValue;
  });

  const setValue = value => {
    setStoredValue(value);
    if (typeof value !== 'string') value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}

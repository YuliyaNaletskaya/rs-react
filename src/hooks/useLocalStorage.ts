import { useState, useEffect, useRef } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: error reading "${key}"`, err);
      return initialValue;
    }
  });

  const prevJson = useRef('');

  useEffect(() => {
    try {
      const newJson = JSON.stringify(value);
      if (newJson !== prevJson.current) {
        localStorage.setItem(key, newJson);
        prevJson.current = newJson;
      }
    } catch (err) {
      console.warn(`useLocalStorage: error reading "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

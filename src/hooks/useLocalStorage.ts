'use client';

import { useState, useEffect, useRef } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T) => void] {
  const isFirstRun = useRef(true);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (err) {
      console.warn(`useLocalStorage: error reading "${key}"`, err);
    }
  }, [key]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: error writing "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

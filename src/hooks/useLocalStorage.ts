import { useState, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(
    (() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        // if local storage had a value, get it
        return JSON.parse(storedValue);
      } else {
        // otherwise, set initial value in local storage
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    })()
  );

  const updateValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue];
}

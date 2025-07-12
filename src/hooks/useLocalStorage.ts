import { useState, useCallback, useEffect } from "react";

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

  // listen for changes in local storage in different tabs
  useEffect(() => {
    const refreshValue = (event: StorageEvent) => {
      if (event.key !== key) return;
      if (event.newValue) setValue(JSON.parse(event.newValue));
    };

    window.addEventListener("storage", refreshValue);
    return () => window.removeEventListener("storage", refreshValue);
  }, [key]);

  const updateValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue];
}

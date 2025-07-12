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

  // if local storage value is changed in a different tab, update it
  useEffect(() => {
    // listen for changes in local storage
    const refreshValue = (event: StorageEvent) => {
      if (event.key !== key) return;
      if (event.newValue) setValue(JSON.parse(event.newValue));
    };
    window.addEventListener("storage", refreshValue);

    // sometimes the local storage event doesn't fire if browser unloads the tab,
    // so also check the value on visibility change
    const checkValue = () => {
      if (document.visibilityState !== "visible") return;
      const storedValue = localStorage.getItem(key);
      if (storedValue) setValue(JSON.parse(storedValue));
    };
    document.addEventListener("visibilitychange", checkValue);

    return () => {
      window.removeEventListener("storage", refreshValue);
      document.removeEventListener("visibilitychange", checkValue);
    };
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

import { useState, useCallback, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  shared = false
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

    // listen for the custom event for localstorage keys shared by multiple components
    const refreshValueCustom = (
      event: CustomEvent<{ key: string; newValue: string }>
    ) => {
      if (event.detail.key !== key) return;
      if (event.detail.newValue) setValue(JSON.parse(event.detail.newValue));
    };
    if (shared)
      window.addEventListener(
        "sharedstorage",
        refreshValueCustom as EventListener
      );

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
      if (shared)
        window.removeEventListener(
          "sharedstorage",
          refreshValueCustom as EventListener
        );
      document.removeEventListener("visibilitychange", checkValue);
    };
  }, [key, shared]);

  const updateValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      // dispach an event to let other components know i changed value
      // because the value doesn't update if the change was made by the same tab
      if (shared)
        window.dispatchEvent(
          new CustomEvent("sharedstorage", {
            detail: { key, newValue: JSON.stringify(newValue) },
          })
        );
      setValue(newValue);
    },
    [key, shared]
  );

  return [value, updateValue];
}

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Interval } from "../utils/types";
import { generateRandom } from "../utils";

interface Random {
  number: number;
  date: string;
}

export function useDailyRandom(
  name: string,
  range: Interval
): [number, () => void] {
  const getToday = useCallback(() => new Date().toDateString(), []);

  // store today's random number in local storage
  const [random, setRandom] = useLocalStorage<Random>(`${name}-random`, {
    number: generateRandom(range),
    date: getToday(),
  });

  // on user request, get a new random number
  const refresh = useCallback(() => {
    setRandom({ number: generateRandom(range), date: getToday() });
  }, [range, setRandom, getToday]);

  const refreshDate = useCallback(() => {
    if (document.visibilityState !== "visible") return;
    if (random.date === getToday()) return;
    refresh();
  }, [getToday, random.date, refresh]);

  // when i switch to this tab, check if the date has changed
  useEffect(() => {
    document.addEventListener("visibilitychange", refreshDate);
    return () => document.removeEventListener("visibilitychange", refreshDate);
  }, [refreshDate]);

  // call once on load...
  useEffect(() => {
    refreshDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [random.number, refresh];
}

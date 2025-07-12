import { useCallback, useEffect, useState } from "react";
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
  const [today, setToday] = useState(new Date().toDateString());

  // when i switch to this tab, check if the date has changed
  useEffect(() => {
    const refreshDate = () => {
      if (document.visibilityState !== "visible") return;

      const newDate = new Date().toDateString();
      if (newDate !== today) setToday(newDate);
    };

    document.addEventListener("visibilitychange", refreshDate);
    return () => document.removeEventListener("visibilitychange", refreshDate);
  }, [today]);

  // store today's random number in local storage
  const [random, setRandom] = useLocalStorage<Random>(`${name}-random`, {
    number: generateRandom(range),
    date: today,
  });

  // on user request, get a new random number
  const refresh = useCallback(() => {
    setRandom({ number: generateRandom(range), date: today });
  }, [range, setRandom, today]);

  // if the date has changed, generate a new random number
  useEffect(() => {
    if (random.date != today) refresh();
  }, [random, refresh, today]);

  return [random.number, refresh];
}

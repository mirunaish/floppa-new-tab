import { useCallback, useEffect, useMemo } from "react";
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
  const today = useMemo(() => new Date().toDateString(), []);

  // store today's random number in local storage
  const [random, setRandom] = useLocalStorage<Random>(`${name}-random`, {
    number: generateRandom(range),
    date: today,
  });

  // on user request, get a new random number today
  const refresh = useCallback(() => {
    setRandom({ number: generateRandom(range), date: today });
  }, [range, setRandom, today]);

  // if the date has changed, generate a new random number
  useEffect(() => {
    if (random.date != today) refresh();
  }, [random, refresh, today]);

  return [random.number, refresh];
}

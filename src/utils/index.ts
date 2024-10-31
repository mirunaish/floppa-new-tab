import { Interval } from "./types";

export const generateRandom = (range: Interval) => {
  return Math.floor(Math.random() * (range.max - range.min) + range.min);
};

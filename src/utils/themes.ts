import bingusIcon from "../assets/Bingus.webp";
import floppaLogo from "../assets/Pet_floppa.webp";

export enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
}

export enum Themes {
  FLOPPA = "floppa",
  BINGUS = "bingus",
}

export interface Theme {
  primary: string;
  primaryAlt: string;
  secondary: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textAlt: string;
}

export const Colors: Record<Themes, Record<ThemeTypes, Theme>> = {
  [Themes.FLOPPA]: {
    [ThemeTypes.DARK]: {
      primary: "#000000",
      primaryAlt: "#111111",
      secondary: "#222222",
      background: "#333333",
      backgroundAlt: "#444444",
      text: "#555555",
      textAlt: "#666666",
    },
    [ThemeTypes.LIGHT]: {
      primary: "#ffffff",
      primaryAlt: "#eeeeee",
      secondary: "#dddddd",
      background: "#cccccc",
      backgroundAlt: "#bbbbbb",
      text: "#aaaaaa",
      textAlt: "#999999",
    },
  },
  [Themes.BINGUS]: {
    [ThemeTypes.DARK]: {
      primary: "#000000",
      primaryAlt: "#111111",
      secondary: "#222222",
      background: "#333333",
      backgroundAlt: "#444444",
      text: "#555555",
      textAlt: "#666666",
    },
    [ThemeTypes.LIGHT]: {
      primary: "#ffffff",
      primaryAlt: "#eeeeee",
      secondary: "#dddddd",
      background: "#cccccc",
      backgroundAlt: "#bbbbbb",
      text: "#aaaaaa",
      textAlt: "#999999",
    },
  },
};

export const ThemeIcons: Record<Themes, string> = {
  [Themes.FLOPPA]: floppaLogo,
  [Themes.BINGUS]: bingusIcon,
};

import bingusIcon from "../assets/Bingus.webp";
import floppaIcon from "../assets/Pet_floppa.webp";
import floppaBackground from "../assets/floppa-bg.jpg";
import floppaDarkBackground from "../assets/floppa-dark.png";
import bingusBackground from "../assets/bingus-bg.jpg";
import bingusDarkBackground from "../assets/bingus-bg-dark.jpg";

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
  backgroundImage: string;
}

export const Colors: Record<Themes, Record<ThemeTypes, Theme>> = {
  [Themes.FLOPPA]: {
    [ThemeTypes.DARK]: {
      primary: "#753A22",
      primaryAlt: "#572612",
      secondary: "#228B22",
      background: "#260C01",
      backgroundAlt: "#4F1802",
      text: "#F7E3D4",
      textAlt: "#C9AF9D",
      backgroundImage: `url(${floppaDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#A86D58",
      primaryAlt: "#8F513B",
      secondary: "#228B22",
      background: "#FAE9DE",
      backgroundAlt: "#FFF9F5",
      text: "#4D2618",
      textAlt: "#996856",
      backgroundImage: `url(${floppaBackground})`,
    },
  },
  [Themes.BINGUS]: {
    [ThemeTypes.DARK]: {
      primary: "#9C3D61",
      primaryAlt: "#662840",
      secondary: "#5e30ba",
      background: "#361129",
      backgroundAlt: "#52103B",
      text: "#FFDEEB",
      textAlt: "#C49BAB",
      backgroundImage: `url(${bingusDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#f294bd",
      primaryAlt: "#c75f8d",
      secondary: "#5e30ba",
      background: "#ffebf3",
      backgroundAlt: "#FFFAFC",
      text: "#5e3044",
      textAlt: "#a85e7e",
      backgroundImage: `url(${bingusBackground})`,
    },
  },
};

export const ThemeIcons: Record<Themes, string> = {
  [Themes.FLOPPA]: floppaIcon,
  [Themes.BINGUS]: bingusIcon,
};

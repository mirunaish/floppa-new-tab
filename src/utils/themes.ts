import floppaIcon from "../assets/Pet_floppa.webp";
import floppaBackground from "../assets/floppa-bg.jpg";
import floppaDarkBackground from "../assets/floppa-dark.png";

import soggaIcon from "../assets/Sogga.png";
import soggaBackground from "../assets/sogga-bg.png";
import soggaDarkBackground from "../assets/sogga-bg-dark.webp";

import bingusIcon from "../assets/Bingus.webp";
import bingusBackground from "../assets/bingus-bg.jpg";
import bingusDarkBackground from "../assets/bingus-bg-dark.jpg";

import maxwellIcon from "../assets/maxwell.png";
import maxwellBackground from "../assets/maxwell-bg.jpg";
import maxwellDarkBackground from "../assets/maxwell-bg-dark-2.jpg";

import oiiaIcon from "../assets/oiia.png";
import oiiaBackground from "../assets/oiia-bg.jpg";
import oiiaDarkBackground from "../assets/oiia-bg-dark.jpg";

import popcatIcon from "../assets/popcat.png";
import popcatBackground from "../assets/popcat-bg.jpg";
import popcatDarkBackground from "../assets/popcat-bg-dark.jpg";

import googasIcon from "../assets/googas.png";
import googasBackground from "../assets/googas-bg.jpg";
import googasDarkBackground from "../assets/googas-bg-dark.jpg";

export enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
}

export enum Themes {
  FLOPPA = "floppa", // brown
  SOGGA = "sogga", // yellow
  BINGUS = "bingus", // purplish pink
  MAXWELL = "maxwell", // greenish
  POPCAT = "popcat", // red
  GOOGAS = "googas", // blue
  OIIA = "oiia", // neons
}

export interface Theme {
  primary: string;
  primaryAlt: string;
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
      background: "#260C01",
      backgroundAlt: "#4F1802",
      text: "#F7E3D4",
      textAlt: "#C9AF9D",
      backgroundImage: `url(${floppaDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#A86D58",
      primaryAlt: "#8F513B",
      background: "#FAE9DE",
      backgroundAlt: "#FFF9F5",
      text: "#4D2618",
      textAlt: "#996856",
      backgroundImage: `url(${floppaBackground})`,
    },
  },
  [Themes.SOGGA]: {
    [ThemeTypes.DARK]: {
      primary: "#b59500",
      primaryAlt: "#946d00",
      background: "#322400",
      backgroundAlt: "#573e04",
      text: "#FFFFE0",
      textAlt: "#c9c986",
      backgroundImage: `url(${soggaDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#f6e85c",
      primaryAlt: "#ddca08",
      background: "#FFFACD",
      backgroundAlt: "#FFFFE0",
      text: "#8B4513",
      textAlt: "#B8860B",
      backgroundImage: `url(${soggaBackground})`,
    },
  },
  [Themes.BINGUS]: {
    [ThemeTypes.DARK]: {
      primary: "#9C3D61",
      primaryAlt: "#662840",
      background: "#361129",
      backgroundAlt: "#52103B",
      text: "#FFDEEB",
      textAlt: "#C49BAB",
      backgroundImage: `url(${bingusDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#f294bd",
      primaryAlt: "#c75f8d",
      background: "#ffebf3",
      backgroundAlt: "#FFFAFC",
      text: "#5e3044",
      textAlt: "#a85e7e",
      backgroundImage: `url(${bingusBackground})`,
    },
  },
  [Themes.MAXWELL]: {
    [ThemeTypes.DARK]: {
      primary: "#567669",
      primaryAlt: "#000000",
      background: "#363636",
      backgroundAlt: "#1F1F1F",
      text: "#FFFFFF",
      textAlt: "#D0D0D0",
      backgroundImage: `url(${maxwellDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#567669",
      primaryAlt: "#C0C0C0",
      background: "#EFEFEF",
      backgroundAlt: "#F7F7F7",
      text: "#000000",
      textAlt: "#505050",
      backgroundImage: `url(${maxwellBackground})`,
    },
  },
  [Themes.OIIA]: {
    [ThemeTypes.DARK]: {
      primary: "#0050FF",
      primaryAlt: "#FF5000",
      background: "#000000",
      backgroundAlt: "#1A1A1A",
      text: "#FFDF00",
      textAlt: "#40FF50",
      backgroundImage: `url(${oiiaDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#00FFFF",
      primaryAlt: "#FF00FF",
      background: "#FFFFFF",
      backgroundAlt: "#FFFF00",
      text: "#B800B8",
      textAlt: "#00B800",
      backgroundImage: `url(${oiiaBackground})`,
    },
  },
  [Themes.POPCAT]: {
    [ThemeTypes.DARK]: {
      primary: "#8B0000",
      primaryAlt: "#660000",
      background: "#2E0000",
      backgroundAlt: "#4B0000",
      text: "#FFD1D1",
      textAlt: "#FFA1A1",
      backgroundImage: `url(${popcatDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#FF7F7F",
      primaryAlt: "#FF4C4C",
      background: "#FFE4E1",
      backgroundAlt: "#FFF5F5",
      text: "#8B0000",
      textAlt: "#CD5C5C",
      backgroundImage: `url(${popcatBackground})`,
    },
  },
  [Themes.GOOGAS]: {
    [ThemeTypes.DARK]: {
      primary: "#044484",
      primaryAlt: "#003366",
      background: "#001122",
      backgroundAlt: "#002449",
      text: "#E0F7FF",
      textAlt: "#97bdca",
      backgroundImage: `url(${googasDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#3399FF",
      primaryAlt: "#0077CC",
      background: "#E6F2FF",
      backgroundAlt: "#F0F8FF",
      text: "#002244",
      textAlt: "#004488",
      backgroundImage: `url(${googasBackground})`,
    },
  },
};

export const ThemeIcons: Record<Themes, string> = {
  [Themes.FLOPPA]: floppaIcon,
  [Themes.SOGGA]: soggaIcon,
  [Themes.BINGUS]: bingusIcon,
  [Themes.MAXWELL]: maxwellIcon,
  [Themes.OIIA]: oiiaIcon,
  [Themes.POPCAT]: popcatIcon,
  [Themes.GOOGAS]: googasIcon,
};

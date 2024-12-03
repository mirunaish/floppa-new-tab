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

import smudgeIcon from "../assets/smudge.png";
import smudgeBackground from "../assets/smudge-bg.jpg";
import smudgeDarkBackground from "../assets/smudge-bg-dark.jpg";

import mrFreshIcon from "../assets/mr-fresh.png";
import mrFreshBackground from "../assets/mr-fresh-bg.jpg";
import mrFreshDarkBackground from "../assets/mr-fresh-bg-dark.png";

import blackcatzoningoutIcon from "../assets/blackcatzoningout.png";
import blackcatzoningoutBackground from "../assets/blackcatzoningout-bg.jpg";
import blackcatzoningoutDarkBackground from "../assets/blackcatzoningout-bg-dark.png";

import vibingCatIcon from "../assets/vibing-cat.png";
import vibingCatBackground from "../assets/vibing-cat-bg.jpg";
import vibingCatDarkBackground from "../assets/vibing-cat-bg-dark.png";

import wawaIcon from "../assets/wawa.png";
import wawaBackground from "../assets/wawa-bg.jpg";
import wawaDarkBackground from "../assets/wawa-bg-dark.jpg";

export enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
}

export enum Themes {
  POPCAT = "popcat", // red
  MR_FRESH = "mrFresh", // orange
  SOGGA = "sogga", // yellow
  SMUDGE = "smudge", // spring green
  WAWA = "wawa", // mint
  GOOGAS = "googas", // blue
  BLACKCATZONINGOUT = "blackcatzoningout", // purple
  VIBING_CAT = "vibingCat", // magenta
  BINGUS = "bingus", // pink

  FLOPPA = "floppa", // brown
  MAXWELL = "maxwell", // pine greenish
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
      primary: "#b56576",
      primaryAlt: "#843247",
      background: "#31101f",
      backgroundAlt: "#4d1e33",
      text: "#f8e1e7",
      textAlt: "#d4b0b8",
      backgroundImage: `url(${bingusDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#f4a3b5",
      primaryAlt: "#e07a8e",
      background: "#ffe6eb",
      backgroundAlt: "#fff5f7",
      text: "#5a2a35",
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
      textAlt: "#c7c7c7",
      backgroundImage: `url(${maxwellDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#567669",
      primaryAlt: "#8f8f8f",
      background: "#cecece",
      backgroundAlt: "#b6b6b6",
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
      primary: "#ff6c6c",
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
      text: "#ebfaff",
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
  [Themes.SMUDGE]: {
    [ThemeTypes.DARK]: {
      primary: "#489331",
      primaryAlt: "#327a1b",
      background: "#083300",
      backgroundAlt: "#094400",
      text: "#e7ffe0",
      textAlt: "#abd0a0",
      backgroundImage: `url(${smudgeDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#72da59",
      primaryAlt: "#57bb3f",
      background: "#e9ffe0",
      backgroundAlt: "#f4fff0",
      text: "#0e3805",
      textAlt: "#318f22",
      backgroundImage: `url(${smudgeBackground})`,
    },
  },
  [Themes.MR_FRESH]: {
    [ThemeTypes.DARK]: {
      primary: "#d36d07",
      primaryAlt: "#944a00",
      background: "#331A00",
      backgroundAlt: "#4D2600",
      text: "#FFE4B5",
      textAlt: "#FFB84D",
      backgroundImage: `url(${mrFreshDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#fb9c29",
      primaryAlt: "#da7803",
      background: "#fdebd1",
      backgroundAlt: "#FFF5E6",
      text: "#4D2600",
      textAlt: "#b36f2c",
      backgroundImage: `url(${mrFreshBackground})`,
    },
  },
  [Themes.BLACKCATZONINGOUT]: {
    [ThemeTypes.DARK]: {
      primary: "#7e3293",
      primaryAlt: "#4e135e",
      background: "#1E0F24",
      backgroundAlt: "#2C1835",
      text: "#f9eaff",
      textAlt: "#BFA8D6",
      backgroundImage: `url(${blackcatzoningoutDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#c657e5",
      primaryAlt: "#971eb9",
      background: "#F5E6F5",
      backgroundAlt: "#FAF0FA",
      text: "#2e1e34",
      textAlt: "#8405b5",
      backgroundImage: `url(${blackcatzoningoutBackground})`,
    },
  },
  [Themes.VIBING_CAT]: {
    [ThemeTypes.DARK]: {
      primary: "#af40a4",
      primaryAlt: "#85217b",
      background: "#2a0d26",
      backgroundAlt: "#3e1238",
      text: "#f9eaff",
      textAlt: "#d0a2d5",
      backgroundImage: `url(${vibingCatDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#eb8ae1",
      primaryAlt: "#cd57c1",
      background: "#ffe6fc",
      backgroundAlt: "#fff3fe",
      text: "#4a0d46",
      textAlt: "#b03ea3",
      backgroundImage: `url(${vibingCatBackground})`,
    },
  },
  [Themes.WAWA]: {
    [ThemeTypes.DARK]: {
      primary: "#008080",
      primaryAlt: "#004C4C",
      background: "#002626",
      backgroundAlt: "#003D3D",
      text: "#edffff",
      textAlt: "#A0CFCF",
      backgroundImage: `url(${wawaDarkBackground})`,
    },
    [ThemeTypes.LIGHT]: {
      primary: "#20B2AA",
      primaryAlt: "#008B8B",
      background: "#E0FFFF",
      backgroundAlt: "#F0FFFF",
      text: "#053333",
      textAlt: "#057575",
      backgroundImage: `url(${wawaBackground})`,
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
  [Themes.SMUDGE]: smudgeIcon,
  [Themes.MR_FRESH]: mrFreshIcon,
  [Themes.BLACKCATZONINGOUT]: blackcatzoningoutIcon,
  [Themes.VIBING_CAT]: vibingCatIcon,
  [Themes.WAWA]: wawaIcon,
};

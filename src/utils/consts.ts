import googleLogo from "../assets/google-logo.svg";
import startpageLogo from "../assets/startpage-logo.svg";
import ddgLogo from "../assets/ddg-logo.svg";
import ecosiaLogo from "../assets/ecosia-logo.ico";
import swisscowsLogo from "../assets/swisscows-logo.svg";
import yepLogo from "../assets/yep-logo.svg";
import openverseLogo from "../assets/openverse-logo.svg";
import qwantLogo from "../assets/qwant-logo.svg";
import searXNGLogo from "../assets/searXNG-logo.svg";
import mojeekLogo from "../assets/mojeek-logo.svg";
import gigabrainLogo from "../assets/gigabrain-logo.png";
import { ImageInfo } from "./types";

export const SEARCH_ENGINES: Record<
  string,
  { name: string; url: string; logo: string; description: string }
> = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    logo: googleLogo,
    description: "it's google",
  },
  ddg: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    logo: ddgLogo,
    description:
      "popular privacy-focused search engine with bing results and a lot of features",
  },
  startpage: {
    name: "StartPage",
    url: "https://www.startpage.com/do/dsearch?query=",
    logo: startpageLogo,
    description: "privacy-focused search engine with google results",
  },
  mojeek: {
    name: "Mojeek",
    url: "https://www.mojeek.com/search?q=",
    logo: mojeekLogo,
    description: "privacy-focused, completely independent search engine",
  },
  swisscows: {
    name: "Swisscows",
    url: "https://swisscows.com/web?query=",
    logo: swisscowsLogo,
    description: "privacy-focused search engine with a family friendly focus",
  },
  searXNG: {
    name: "SearXNG",
    url: "https://search.catboy.house/search?q=",
    logo: searXNGLogo,
    description:
      "a metasearch engine that aggregates results from other search engines",
  },
  ecosia: {
    name: "Ecosia",
    url: "https://www.ecosia.org/search?q=",
    logo: ecosiaLogo,
    description:
      "uses ad revenue to plant trees (remember to disable your ad blocker)",
  },
  yep: {
    name: "Yep",
    url: "https://www.yep.com/web?q=",
    logo: yepLogo,
    description:
      "shares ad revenue with creators (remember to disable your ad blocker)",
  },
  gigabrain: {
    name: "Gigabrain",
    url: "https://gigabrain.com/search/",
    logo: gigabrainLogo,
    description: "searches reddit posts",
  },
  openverse: {
    name: "Openverse",
    url: "https://openverse.org/search?q=",
    logo: openverseLogo,
    description: "public domain images",
  },
};

export const IMAGES: Record<string, ImageInfo> = {
  popcat: {
    id: "popcat",
    title: "",
    url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXB1NW5ya3o1Nmg1NWJhN25rNnBsYmMwa3htMGJvODN4ZTg1ZWlsMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XUA7ZZcBl0McuVqwd8/giphy.webp",
  },
  maxwell: {
    id: "maxwell",
    title: "",
    url: "https://miro.medium.com/v2/resize:fill:96:96/1*JNcS9ZJbBsZjKOSXp-F4cQ.gif",
  },
  "vibing cat": {
    id: "vibing cat",
    title: "",
    url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3lkdXFwbXppOW5sZGpydmphejBrNTBqa2FtazN6c2k5NXluNmd5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BXjqytvu9bKzCUHdzz/200w.webp",
  },
  "dancing cat": {
    id: "dancing cat",
    title: "",
    url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd20xbXF1bDVkbTdmdTQya3pmNDVwdnZtMnZvY3FxNGV3aDV5MDJ6NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rrasLFSTyi4Th1e8Xo/giphy.webp",
  },
};

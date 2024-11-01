import googleLogo from "../assets/google-logo.svg";
import startpageLogo from "../assets/startpage-logo.svg";
import ddgLogo from "../assets/ddg-logo.svg";

export const SEARCH_ENGINES: Record<
  string,
  { name: string; url: string; logo: string }
> = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    logo: googleLogo,
  },
  startpage: {
    name: "StartPage",
    url: "https://www.startpage.com/do/dsearch?query=",
    logo: startpageLogo,
  },
  ddg: {
    name: "DDG",
    url: "https://duckduckgo.com/?q=",
    logo: ddgLogo,
  },
};
export const DEFAULT_ENGINE = "startpage";

export const Images: Record<string, string> = {
  popcat:
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXB1NW5ya3o1Nmg1NWJhN25rNnBsYmMwa3htMGJvODN4ZTg1ZWlsMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XUA7ZZcBl0McuVqwd8/giphy.webp",
  maxwell:
    "https://miro.medium.com/v2/resize:fill:96:96/1*JNcS9ZJbBsZjKOSXp-F4cQ.gif",
  "vibing cat":
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3lkdXFwbXppOW5sZGpydmphejBrNTBqa2FtazN6c2k5NXluNmd5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BXjqytvu9bKzCUHdzz/200w.webp",
  "dancing cat":
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd20xbXF1bDVkbTdmdTQya3pmNDVwdnZtMnZvY3FxNGV3aDV5MDJ6NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rrasLFSTyi4Th1e8Xo/giphy.webp",
};

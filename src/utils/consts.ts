export const SearchEngines: Record<
  string,
  { logo: string; name: string; url: string }
> = {
  google: {
    logo: "src/assets/Google-logo.svg",
    name: "Google",
    url: "https://www.google.com/search?q=",
  },
  startpage: {
    logo: "src/assets/startpage-logo.svg",
    name: "StartPage",
    url: "https://www.startpage.com/do/dsearch?query=",
  },
  ddg: {
    logo: "src/assets/ddg-logo.svg",
    name: "DDG",
    url: "https://duckduckgo.com/?q=",
  },
};
export const DEFAULT_ENGINE = "startpage";

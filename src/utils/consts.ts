export const SearchEngines: Record<string, { name: string; url: string }> = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
  },
  startpage: {
    name: "StartPage",
    url: "https://www.startpage.com/do/dsearch?query=",
  },
  ddg: {
    name: "DDG",
    url: "https://duckduckgo.com/?q=",
  },
};
export const DEFAULT_ENGINE = "startpage";

export const SearchEngines: Record<
  string,
  { logo: string; name: string; url: string }
> = {
  google: {
    logo: "",
    name: "Google",
    url: "https://www.google.com/search?q=",
  },
  startpage: {
    logo: "",
    name: "StartPage",
    url: "https://www.startpage.com/do/dsearch?query=",
  },
  ddg: { logo: "", name: "DDG", url: "https://duckduckgo.com/?q=" },
};
export const DEFAULT_ENGINE = "startpage";

import { FaMoon, FaRegSun } from "react-icons/fa6";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeIcons, Themes, ThemeTypes } from "../utils/themes";
import BubbleSelector from "./BubbleSelector";

const ThemeSelector: React.FC = () => {
  const [theme, setTheme] = useLocalStorage("theme", Themes.FLOPPA);
  const [themeType, setThemeType] = useLocalStorage(
    "themeType",
    ThemeTypes.DARK
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <BubbleSelector
        value={theme}
        onChange={(value) => setTheme(value as Themes)}
        options={Object.values(Themes).map((themeName) => ({
          id: themeName,
          image: (props) => <img {...props} src={ThemeIcons[themeName]} />,
        }))}
        imageSize={{ width: 50, height: 50 }}
      />

      <BubbleSelector
        value={themeType}
        onChange={(value) => setThemeType(value as ThemeTypes)}
        options={Object.values(ThemeTypes).map((themeTypeName) => ({
          id: themeTypeName,
          image:
            themeTypeName === ThemeTypes.DARK
              ? (props) => <FaMoon size={20} {...props} />
              : (props) => <FaRegSun size={20} {...props} />,
        }))}
      />
    </div>
  );
};

export default ThemeSelector;

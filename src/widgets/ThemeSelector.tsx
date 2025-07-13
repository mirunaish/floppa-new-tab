import { FaMoon, FaRegSun } from "react-icons/fa6";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Colors, ThemeIcons, Themes, ThemeTypes } from "../utils/themes";
import BubbleSelector from "../components/BubbleSelector";
import { useCallback, useEffect } from "react";
import Card, { CardComponentProps } from "../components/Card";

const ThemeSelector: React.FC<CardComponentProps> = ({
  id,
  close,
  visible,
}) => {
  const [theme, setTheme] = useLocalStorage("theme", Themes.FLOPPA);
  const [themeType, setThemeType] = useLocalStorage(
    "themeType",
    ThemeTypes.DARK
  );

  // change theme variables on root
  const loadTheme = useCallback(
    (newTheme: Themes, newThemeType: ThemeTypes) => {
      const root = document.documentElement;
      const colors = Colors[newTheme][newThemeType];
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });

      // also change primaryAltTransparent
      root.style.setProperty(
        "--primaryAltTransparent",
        `${colors.primaryAlt}99`
      );

      // and also change icon
      root.style.setProperty(`--icon`, `url(${ThemeIcons[newTheme]})`);
    },
    []
  );

  const onChange = useCallback(
    (newTheme: Themes, newThemeType: ThemeTypes) => {
      if (theme !== newTheme) setTheme(newTheme);
      if (themeType !== newThemeType) setThemeType(newThemeType);
    },
    [setTheme, setThemeType, theme, themeType]
  );

  // whenever theme changes, load the variables
  useEffect(() => {
    loadTheme(theme, themeType);
  }, [loadTheme, theme, themeType]);

  if (!visible) return null;
  return (
    <Card id={id} title="pick your theme" close={close}>
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
          onChange={(value) => onChange(value as Themes, themeType)}
          options={Object.values(Themes).map((themeName) => ({
            id: themeName,
            image: (props) => <img {...props} src={ThemeIcons[themeName]} />,
          }))}
          imageSize={{ width: 50, height: 50 }}
          maxCols={4}
        />

        <BubbleSelector
          value={themeType}
          onChange={(value) => onChange(theme, value as ThemeTypes)}
          options={Object.values(ThemeTypes).map((themeTypeName) => ({
            id: themeTypeName,
            image:
              themeTypeName === ThemeTypes.DARK
                ? (props) => <FaMoon size={20} {...props} />
                : (props) => <FaRegSun size={20} {...props} />,
          }))}
        />
      </div>
    </Card>
  );
};

export default ThemeSelector;

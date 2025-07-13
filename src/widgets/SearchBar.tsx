import React, { useCallback, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { SEARCH_ENGINES } from "../utils/consts";
import TextInputButton from "../components/TextInputButton";
import BubbleSelector from "../components/BubbleSelector";
import Card, { CardComponentProps } from "../components/Card";
import { useLocalStorage } from "../hooks/useLocalStorage";

const IMAGE_SIZE = { width: 25, height: 25 };

const SearchBar: React.FC<CardComponentProps> = ({ id, close }) => {
  const [defaultEngine, setDefaultEngine] = useLocalStorage(
    "default-search-engine",
    "google"
  );
  const [searchEngine, setSearchEngine] = useState(defaultEngine);

  const search = useCallback(
    (query: string) => {
      const engine = SEARCH_ENGINES[searchEngine];
      window.location.href = `${engine.url}${query}`;
    },
    [searchEngine]
  );

  return (
    <Card
      id={id}
      title="search"
      close={close}
      resizeable="ew"
      buttons={() => (
        <FaStar
          className="click"
          onClick={() => setDefaultEngine(searchEngine)}
        />
      )}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <TextInputButton
          id="search-input"
          placeholder="search..."
          onEnter={(value: string) => {
            search(value);
          }}
        />

        <BubbleSelector
          value={searchEngine}
          onChange={(value) => {
            setSearchEngine(value);
            document.getElementById("search-input")?.focus();
          }}
          style={{ marginTop: 8 }}
          options={Object.entries(SEARCH_ENGINES).map(([id, engine]) => ({
            id,
            image: (props) => <img {...props} src={engine.logo} />,
            tooltip: engine.name + " - " + engine.description,
          }))}
          imageSize={IMAGE_SIZE}
          starred={defaultEngine}
        />
      </div>
    </Card>
  );
};

export default SearchBar;

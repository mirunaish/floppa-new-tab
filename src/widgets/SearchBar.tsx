import React, { useCallback, useState } from "react";
import { DEFAULT_ENGINE, SEARCH_ENGINES } from "../utils/consts";
import TextInputButton from "../components/TextInputButton";
import BubbleSelector from "../components/BubbleSelector";
import Card, { CardComponentProps } from "../components/Card";

const IMAGE_SIZE = { width: 25, height: 25 };

const SearchBar: React.FC<CardComponentProps> = ({ id, close }) => {
  const [searchEngine, setSearchEngine] = useState(DEFAULT_ENGINE);

  const search = useCallback(
    (query: string) => {
      const engine = SEARCH_ENGINES[searchEngine];
      window.location.href = `${engine.url}${query}`;
    },
    [searchEngine]
  );

  return (
    <Card id={id} title="search" close={close} resizeable="ew">
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
          }))}
          imageSize={IMAGE_SIZE}
        />
      </div>
    </Card>
  );
};

export default SearchBar;

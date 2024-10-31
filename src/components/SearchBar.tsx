import React, { useCallback, useState } from "react";
import { DEFAULT_ENGINE, SearchEngines } from "../utils/consts";
import TextInput from "./TextInput";
import BubbleSelector from "./BubbleSelector";

const IMAGE_SIZE = { width: 25, height: 25 };

const SearchBar: React.FC = () => {
  const [searchEngine, setSearchEngine] = useState(DEFAULT_ENGINE);

  const search = useCallback(
    (query: string) => {
      const engine = SearchEngines[searchEngine];
      window.location.href = `${engine.url}${query}`;
    },
    [searchEngine]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextInput
        placeholder="search..."
        onEnter={(value: string) => {
          search(value);
        }}
      />

      <BubbleSelector
        value={searchEngine}
        onChange={setSearchEngine}
        style={{ marginTop: 8 }}
        options={Object.entries(SearchEngines).map(([id, engine]) => ({
          id,
          image: (props) => <img {...props} src={engine.logo} />,
        }))}
        imageSize={IMAGE_SIZE}
      />
    </div>
  );
};

export default SearchBar;

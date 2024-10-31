import React, { useCallback, useState } from "react";
import "./SearchBar.css";
import { DEFAULT_ENGINE, SearchEngines } from "../utils/consts";
import TextInput from "./TextInput";

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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
        }}
      >
        {Object.entries(SearchEngines).map(([id, engine]) => (
          <div
            key={id}
            onClick={() => {
              setSearchEngine(id);
            }}
            className={"bubble" + (id === searchEngine ? " selected" : "")}
          >
            <img
              style={{ ...IMAGE_SIZE, margin: 5, padding: 0 }}
              src={engine.logo}
              alt={engine.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

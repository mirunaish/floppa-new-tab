import React, { useCallback, useState } from "react";
import { DEFAULT_ENGINE, SearchEngines } from "../consts";
import TextInput from "./TextInput";

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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <select
        value={searchEngine}
        onChange={(e) => setSearchEngine(e.target.value)}
      >
        {Object.entries(SearchEngines).map(([id, engine]) => (
          <option key={id} value={id}>
            {engine.name}
          </option>
        ))}
      </select>

      <TextInput
        placeholder="search..."
        onEnter={(value: string) => {
          search(value);
        }}
      />
    </div>
  );
};

export default SearchBar;

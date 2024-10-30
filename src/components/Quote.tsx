import React, { useMemo } from "react";
import quotes from "../assets/quotes.json";

const Quote: React.FC = () => {
  const quote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <div style={{ alignItems: "baseline" }}>
      <span style={{ fontFamily: "Tangerine", fontSize: "2em" }}>
        "{quote.quote}"
      </span>
      <span style={{ color: "gray" }}> - {quote.author}</span>
    </div>
  );
};

export default Quote;

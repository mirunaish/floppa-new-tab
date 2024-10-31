import React, { useMemo } from "react";
import quotes from "../assets/quotes.json";
import { useDailyRandom } from "../hooks/useDailyRandom";
import { FaRotateRight } from "react-icons/fa6";
import Card from "./Card";

const Quote: React.FC = () => {
  const [quoteIndex, refreshQuote] = useDailyRandom("quote", {
    min: 0,
    max: quotes.length,
  });

  const quote = useMemo(() => {
    return quotes[quoteIndex];
  }, [quoteIndex]);

  return (
    <Card
      title="your daily quote"
      initialPosition={{ x: 50, y: 10 }}
      buttons={() => (
        <FaRotateRight style={{ cursor: "pointer" }} onClick={refreshQuote} />
      )}
    >
      <div style={{ alignItems: "baseline" }}>
        <span style={{ fontFamily: "Tangerine", fontSize: "2em" }}>
          "{quote.quote}"
        </span>
        <span style={{ color: "var(--gray)" }}> - {quote.author}</span>
      </div>
    </Card>
  );
};

export default Quote;

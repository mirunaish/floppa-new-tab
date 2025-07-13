import React, { useMemo } from "react";
import initialQuotes from "../assets/quotes.json";
import { useDailyRandom } from "../hooks/useDailyRandom";
import { FaRotateRight, FaUpload } from "react-icons/fa6";
import Card, { CardComponentProps } from "../components/Card";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Quote: React.FC<CardComponentProps> = ({ id, close }) => {
  const [quotes, setQuotes] = useLocalStorage("quotes", initialQuotes);

  const [quoteIndex, refreshQuote] = useDailyRandom(id, {
    min: 0,
    max: quotes.length,
  });

  const quote = useMemo(() => {
    return quotes[quoteIndex];
  }, [quoteIndex, quotes]);

  const handleFileUpload = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedQuotes = JSON.parse(e.target?.result as string);
        if (!Array.isArray(uploadedQuotes)) {
          console.error("Uploaded file is not a valid JSON array");
          alert("Uploaded file is not a valid JSON array");
        }

        setQuotes(uploadedQuotes);
        refreshQuote();
      } catch (error) {
        console.error("Error parsing uploaded file", error);
        alert("Error parsing uploaded file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card
      id={id}
      title="your daily quote"
      close={close}
      buttons={() => (
        <>
          <FaUpload
            title="upload quotes (see instructions in about widget)"
            className="click"
            onClick={() => document.getElementById("uploadQuotes")?.click()}
          />
          <FaRotateRight
            title="get a new quote"
            className="click"
            onClick={refreshQuote}
          />
        </>
      )}
      resizeable="nwse"
    >
      <div style={{ maxWidth: 1000 }}>
        <span style={{ fontFamily: "Tangerine", fontSize: "2em" }}>
          "{quote.quote}"
        </span>
        <span className="alt-text"> - {quote.author}</span>
      </div>

      <input
        id="uploadQuotes"
        type="file"
        onChange={(e) => handleFileUpload(e.target.files?.[0])}
        style={{ display: "none" }}
      />
    </Card>
  );
};

export default Quote;

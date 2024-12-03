import { CSSProperties, ReactNode } from "react";
import "./BubbleSelector.css";

interface BubbleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    id: string;
    image: (props: { style: CSSProperties }) => ReactNode;
  }[];
  imageSize?: { width: number; height: number };
  maxCols?: number; // wrap after this many columns
  style?: CSSProperties;
}

const BubbleSelector: React.FC<BubbleSelectorProps> = ({
  value,
  onChange,
  options,
  imageSize,
  style,
  maxCols = 10,
}) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
      }}
    >
      {/* map over rows */}
      {options
        .filter((_, i) => i % maxCols == 0)
        .map((_, i) => (
          <div
            style={{
              ...style,
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            {/* map over columns in this row */}
            {options
              .slice(maxCols * i, maxCols * (i + 1))
              .map(({ id, image }) => (
                <div
                  key={id}
                  onClick={() => {
                    onChange(id);
                  }}
                  className={"bubble" + (id === value ? " selected" : "")}
                >
                  {image({ style: { ...imageSize, margin: 5 } })}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default BubbleSelector;

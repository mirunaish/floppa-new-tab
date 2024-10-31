import { CSSProperties, ReactNode } from "react";

interface BubbleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    id: string;
    image: (props: { style: CSSProperties }) => ReactNode;
  }[];
  imageSize?: { width: number; height: number };
  style?: CSSProperties;
}

const BubbleSelector: React.FC<BubbleSelectorProps> = ({
  value,
  onChange,
  options,
  imageSize,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
    >
      {options.map(({ id, image }) => (
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
  );
};

export default BubbleSelector;

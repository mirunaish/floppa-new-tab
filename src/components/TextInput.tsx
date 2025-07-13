import React from "react";
import TextareaAutoSize from "react-textarea-autosize";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  type?: "text" | "textarea";
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/** normal text input */
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  style = {},
  type = "text",
  onKeyDown,
}) => {
  return type === "textarea" ? (
    <TextareaAutoSize
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // fix height prop type mismatch (just ignore height for textareaautosize)
      {...{ ...style, height: undefined, translate: undefined }}
      onKeyDown={onKeyDown}
    />
  ) : (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={style}
      onKeyDown={onKeyDown}
    />
  );
};

export default TextInput;

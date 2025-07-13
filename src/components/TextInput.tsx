import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  long?: boolean;
}

/** normal text input */
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  style = {},
  long = false,
}) => {
  return long ? (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={style}
    />
  ) : (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={style}
    />
  );
};

export default TextInput;

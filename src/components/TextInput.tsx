import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  long?: boolean;
}

/** normal text input */
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  long = false,
}) => {
  return long ? (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;

import React, { useState } from "react";

interface TextInputProps {
  onEnter: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  onEnter,
  placeholder,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue ?? "");

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter(value);
          setValue("");
        }
      }}
    />
  );
};

export default TextInput;

import React, { useState } from "react";

interface TextInputButtonProps {
  id?: string;
  onEnter: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

/** text input that does something when you press enter */
const TextInputButton: React.FC<TextInputButtonProps> = ({
  id = undefined,
  onEnter,
  placeholder,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue ?? "");

  return (
    <input
      id={id}
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

export default TextInputButton;

import React, { useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";

interface TextInputButtonProps {
  id?: string;
  type?: "text" | "textarea";
  onEnter: (value: string) => void;
  cancel?: () => void;
  placeholder?: string;
  initialValue?: string;
  style?: React.CSSProperties;
}

/** text input that does something when you press enter */
const TextInputButton: React.FC<TextInputButtonProps> = ({
  id = undefined,
  type = "text",
  onEnter,
  cancel,
  placeholder,
  initialValue,
  style = {},
}) => {
  const [value, setValue] = useState(initialValue ?? "");

  const props = {
    id,
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    onKeyDown: (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.key === "Enter") {
        onEnter(value);
        setValue("");
      }
      if (e.key === "Escape" && cancel) {
        cancel();
        setValue("");
      }
    },
    style,
  };

  return type === "text" ? (
    <input type="text" {...props} />
  ) : (
    <TextareaAutoSize
      // fix height prop type mismatch (just ignore height for textareaautosize)
      {...{ ...props, style: { ...props.style, height: undefined } }}
    />
  );
};

export default TextInputButton;

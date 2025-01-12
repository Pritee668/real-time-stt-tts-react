import React from "react";

function TextInput({ text, onTextChange }) {
  return (
    <textarea
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Enter text here..."
    />

  );
}

export default TextInput;
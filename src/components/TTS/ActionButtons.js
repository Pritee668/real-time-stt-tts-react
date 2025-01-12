import React from "react";

function ActionButtons({ onSpeak, onStop, onReset, isSpeaking }) {
  return (
    <div className="actions">
      <button onClick={onSpeak} disabled={isSpeaking}>
        {isSpeaking ? "Speaking..." : "Speak"}
      </button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default ActionButtons;
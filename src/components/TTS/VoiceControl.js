import React from "react";

function VoiceControl({ voice, voices, onVoiceChange, rate, onRateChange, pitch, onPitchChange }) {
  return (
    <div className="voice-control">
      <select value={voice} onChange={(e) => onVoiceChange(e.target.value)}>
        {voices.map((voiceOption) => (
          <option key={voiceOption.name} value={voiceOption.name}>
            {voiceOption.label}
          </option>
        ))}
      </select>
      <label>
        Rate:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => onRateChange(e.target.value)}
        />
      </label>
      <label>
        Pitch:
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => onPitchChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default VoiceControl;
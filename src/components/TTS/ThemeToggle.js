import React from "react";


function ThemeToggle({ toggleDarkMode, darkMode }) {
  return (
    <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle Theme">
      {darkMode ? "🌞" : "🌙"} {/* Sun for light mode, moon for dark mode */}
    </button>
  );
}

export default ThemeToggle;

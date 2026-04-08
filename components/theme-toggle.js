"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tow-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <path
        d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.72 5.28l-2.12 2.12M7.4 16.6l-2.12 2.12M18.72 18.72l-2.12-2.12M7.4 7.4L5.28 5.28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15.8 3.2a8.8 8.8 0 1 0 5 15.9A9.8 9.8 0 0 1 15.8 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const initialTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
  }, []);

  function handleToggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const nextThemeLabel = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-shift"
      onClick={handleToggle}
      aria-label={`Switch to ${nextThemeLabel} theme`}
      title={`Switch to ${nextThemeLabel} theme`}
    >
      <span className={`theme-shift-icon${theme === "light" ? " active" : ""}`}>
        <SunIcon />
      </span>
      <span className={`theme-shift-icon${theme === "dark" ? " active" : ""}`}>
        <MoonIcon />
      </span>
    </button>
  );
}

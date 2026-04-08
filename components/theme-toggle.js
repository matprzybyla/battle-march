"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tow-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    setMounted(true);
  }, []);

  function handleToggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const nextThemeLabel = theme === "dark" ? "light" : "dark";
  const visibleLabel = mounted ? theme : "light";

  return (
    <button
      type="button"
      className="theme-shift"
      onClick={handleToggle}
      aria-label={`Switch to ${nextThemeLabel} theme`}
      title={`Switch to ${nextThemeLabel} theme`}
    >
      <span className="theme-shift-label">Theme</span>
      <strong>{visibleLabel}</strong>
    </button>
  );
}

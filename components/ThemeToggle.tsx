"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemePreference = "light" | "dark" | "system";

type ThemeToggleProps = {
  showLabel?: boolean;
};

const STORAGE_KEY = "niraj-theme";

function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const preference = window.localStorage.getItem(STORAGE_KEY);

  if (
    preference === "light" ||
    preference === "dark" ||
    preference === "system"
  ) {
    return preference;
  }

  return "system";
}

function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference !== "system") {
    return preference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;

  window.localStorage.setItem(STORAGE_KEY, preference);
  window.dispatchEvent(new Event("niraj-theme-change"));
}

export default function ThemeToggle({
  showLabel = false,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getStoredPreference());
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const preference = getStoredPreference();

      if (preference === "system") {
        document.documentElement.dataset.theme = mediaQuery.matches
          ? "dark"
          : "light";
      }
    };

    syncTheme();
    setMounted(true);

    window.addEventListener("niraj-theme-change", syncTheme);
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener("niraj-theme-change", syncTheme);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function cycleTheme() {
    const nextTheme: ThemePreference =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  const label =
    theme === "light"
      ? "Light theme"
      : theme === "dark"
        ? "Dark theme"
        : "System theme";

  return (
    <button
      type="button"
      className={`theme-toggle ${showLabel ? "theme-toggle--labeled" : ""}`}
      onClick={cycleTheme}
      aria-label={`Current setting: ${label}. Change theme.`}
      title={`Current setting: ${label}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {!mounted || theme === "system" ? (
          <MonitorCog size={19} strokeWidth={1.8} />
        ) : theme === "dark" ? (
          <Moon size={19} strokeWidth={1.8} />
        ) : (
          <Sun size={19} strokeWidth={1.8} />
        )}
      </span>

      {showLabel && (
        <span className="theme-toggle__content">
          <span className="theme-toggle__title">Appearance</span>
          <span className="theme-toggle__value">{label}</span>
        </span>
      )}
    </button>
  );
}
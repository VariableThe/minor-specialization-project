"use client";

import { useCallback, useSyncExternalStore } from "react";

function currentIsDark() {
  if (typeof document === "undefined") return true;
  const t = document.documentElement.dataset.theme;
  if (t) return t === "dark";
  return document.documentElement.classList.contains("dark");
}

function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const mo = new MutationObserver(onChange);
  mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, currentIsDark, () => true);

  const toggle = useCallback(() => {
    const next = !currentIsDark();
    const root = document.documentElement;
    root.dataset.theme = next ? "dark" : "light";
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* noop */
    }
  }, []);

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle color theme"
      title={dark ? "Switch to light" : "Switch to dark"}
      className="toggle-track"
      data-on={dark}
    >
      <span className="toggle-thumb" aria-hidden />
    </button>
  );
}

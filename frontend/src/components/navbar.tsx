"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { id: "overview", label: "overview" },
  { id: "results", label: "results" },
  { id: "activity", label: "activity" },
  { id: "verification", label: "verification" },
  { id: "cross-day", label: "cross-day" },
  { id: "methods", label: "methods" },
  { id: "orientation", label: "orientation" },
  { id: "robustness", label: "robustness" },
  { id: "experiments", label: "experiments" },
  { id: "tracks", label: "tracks" },
  { id: "workflow", label: "workflow" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length || typeof IntersectionObserver === "undefined")
      return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "color-mix(in srgb, var(--bg) 82%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav
        className="mx-auto flex min-h-14 flex-wrap items-center gap-x-5 gap-y-1 px-6 py-3"
        style={{ maxWidth: "72rem" }}
        aria-label="Sections"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            letterSpacing: "-0.01em",
            color: "var(--text-display)",
            marginRight: "auto",
          }}
        >
          gait biometrics
        </button>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="nav-link"
              data-active={active === l.id}
            >
              {l.label}
            </button>
          ))}
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}

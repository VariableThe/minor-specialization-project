"use client";

import { hero, team } from "@/lib/data";

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="pt-10 sm:pt-14">
      <p className="caption-mono">{hero.badge}</p>
      <h1
        className="mt-4 text-4xl leading-[1.05] sm:text-5xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        Gait Biometrics
      </h1>
      <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-(--text-secondary)">
        {hero.subtitle}
      </p>
      <p className="caption-mono mt-5">
        Built by {team.members[0].name} ({team.members[0].role.toLowerCase()}),{" "}
        {team.members[1].name} ({team.members[1].role.toLowerCase()}) and{" "}
        {team.members[2].name} ({team.members[2].role.toLowerCase()}), mentored
        by {team.mentor.name} ({team.institution}).
      </p>
      <p className="mt-5 flex gap-5 font-mono text-xs">
        <button
          onClick={() => go("results")}
          className="cursor-pointer text-(--text-secondary) transition-colors duration-150 hover:text-(--accent)"
        >
          results
        </button>
        <button
          onClick={() => go("workflow")}
          className="cursor-pointer text-(--text-secondary) transition-colors duration-150 hover:text-(--accent)"
        >
          workflow
        </button>
      </p>
    </section>
  );
}

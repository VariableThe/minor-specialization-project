"use client";

import { stats } from "@/lib/data";
import { CountUp } from "@/components/count-up";
import { Section } from "@/components/section";
import { Reveal, Stagger } from "@/components/motion";

export function StatsStrip() {
  return (
    <Section id="results" eyebrow="results" title="Key results">
      <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
        {stats.map((s) => (
          <div key={s.id}>
            <p className="stat-label">{s.label}</p>
            <p className="stat-number mt-2 text-[1.625rem] leading-none">
              {s.id === "tests" ? (
                <span>
                  <CountUp target={996} decimals={0} />{" "}
                  <span className="text-[1.1rem] font-normal text-(--text-disabled)">
                    / 992
                  </span>
                </span>
              ) : (
                <CountUp
                  target={s.value}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix ?? ""}
                />
              )}
            </p>
            {s.sub && <p className="caption-mono mt-2">{s.sub}</p>}
          </div>
        ))}
      </Stagger>
      <Reveal className="mt-8">
        <p className="caption-mono">
          cross-day split 15/5/5, calibration-frozen threshold
        </p>
      </Reveal>
    </Section>
  );
}

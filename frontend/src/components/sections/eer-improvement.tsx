"use client";

import { eerImprovements, eerHonesty, eerNegative } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, Stagger, GrowBar } from "@/components/motion";

function relReduction(before: number, after: number) {
  return Math.round(((before - after) / before) * 100);
}

export function EerSection() {
  return (
    <Section
      id="verification"
      eyebrow="verification"
      title="Metric learning collapsed the equal-error rate"
      description="A before → after comparison across both sources. The goal metric for passive authentication."
    >
      <Stagger className="grid gap-10 md:grid-cols-2 md:gap-8">
        {eerImprovements.map((d) => {
          const reduction = relReduction(d.before, d.after);
          const max = Math.max(d.before, d.after) * 1.15;
          const pct = (v: number) => (v / max) * 100;
          return (
            <div key={d.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base">{d.source}</h3>
                <span className="num font-mono text-xs text-(--accent)">
                  −{reduction}%
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                    <span className="text-(--text-disabled)">before</span>
                    <span className="num font-medium text-(--text-secondary)">
                      {(d.before * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-xs"
                    style={{ background: "var(--surface-raised)" }}
                  >
                    <GrowBar
                      width={`${pct(d.before)}%`}
                      color="var(--text-disabled)"
                      className="rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                    <span className="text-(--text-disabled)">after</span>
                    <span className="num font-medium text-(--text-display)">
                      {(d.after * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-xs"
                    style={{ background: "var(--surface-raised)" }}
                  >
                    <GrowBar
                      width={`${pct(d.after)}%`}
                      color="var(--accent)"
                      delay={150}
                      className="rounded-xs"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-xs leading-relaxed text-(--text-secondary)">
                <span className="text-(--accent)">↓</span> {d.method}
              </p>
            </div>
          );
        })}
      </Stagger>

      <Reveal className="mt-8">
        <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {eerHonesty}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {eerNegative}
        </p>
      </Reveal>
    </Section>
  );
}

"use client";

import { speedups, speedupNote } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, Stagger } from "@/components/motion";
import { CountUp } from "@/components/count-up";

function parseSpeedup(value: string) {
  const n = parseFloat(value.replace("×", ""));
  return Number.isFinite(n) ? n : 0;
}

export function SpeedupsSection() {
  return (
    <Section
      id="speedups"
      eyebrow="speedups"
      title="Measured execution gains"
      description="Wall-clock improvements, reported independently of biometric quality."
    >
      <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
        {speedups.map((s) => (
          <div key={s.label}>
            <p className="stat-number text-[1.625rem] leading-none">
              <CountUp
                target={parseSpeedup(s.value)}
                decimals={2}
                suffix="×"
              />
            </p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-(--text-secondary)">
              {s.label}
            </p>
            {s.sub && <p className="caption-mono mt-1">{s.sub}</p>}
          </div>
        ))}
      </Stagger>
      <Reveal className="mt-8">
        <p className="caption-mono">{speedupNote}</p>
      </Reveal>
    </Section>
  );
}

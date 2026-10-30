"use client";

import { experimentRows, experimentsClosing } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export function ExperimentsSection() {
  return (
    <Section
      id="experiments"
      eyebrow="experiments"
      title="Every registered experiment, including the ones that did not work"
      description="Each study below ran against a predeclared gate. Most did not pass, and the baseline stood."
    >
      <div className="grid gap-8">
        {experimentRows.map((r, i) => (
          <Reveal key={r.id}>
            <article className="entry">
              <p className="entry-when">study {String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-base leading-snug">{r.study}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
                  {r.outcome}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {experimentsClosing}
        </p>
      </Reveal>
    </Section>
  );
}

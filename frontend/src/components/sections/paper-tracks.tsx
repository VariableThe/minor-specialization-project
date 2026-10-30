"use client";

import { paperTracks, paperTrackFooter } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export function PaperTracksSection() {
  return (
    <Section
      id="tracks"
      eyebrow="tracks"
      title="Paper → implementation map"
      description="Seven reference papers, each adapted into a concrete model or toolchain."
    >
      <div className="grid gap-7">
        {paperTracks.map((t) => (
          <Reveal key={t.track}>
            <article className="entry">
              <p className="entry-when">{t.track}</p>
              <div>
                <h3 className="text-base leading-snug">
                  {t.paper}{" "}
                  {t.venue && (
                    <span className="entry-at">
                      · {t.venue}
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
                  {t.note}
                </p>
                <p className="caption-mono mt-1">{t.impl}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <p className="caption-mono">{paperTrackFooter}</p>
      </Reveal>
    </Section>
  );
}

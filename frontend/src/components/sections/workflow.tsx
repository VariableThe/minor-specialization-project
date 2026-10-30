"use client";

import { workflowPhases, workflowFeedback } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export function WorkflowSection() {
  return (
    <Section
      id="workflow"
      eyebrow="workflow"
      title="how the work flowed"
      description="Three phases with a dependency–feedback loop — how data, models, and evaluation passed between students."
    >
      <div className="grid gap-8">
        {workflowPhases.map((p, i) => (
          <Reveal key={p.id}>
            <article className="entry">
              <p className="entry-when">phase {i + 1}</p>
              <div>
                <h3 className="text-base leading-snug">{p.title}</h3>
                <p className="entry-at mt-1 font-mono text-xs">
                  {p.owner.toLowerCase()}
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[0.9375rem] leading-relaxed text-(--text-secondary)"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div
          className="rounded-sm p-5"
          style={{
            border: "1px dashed var(--border-visible)",
            background: "var(--surface)",
          }}
        >
          <h4 className="font-mono text-xs font-medium text-(--text-display)">
            {workflowFeedback.title}
          </h4>
          <ul className="mt-3 space-y-2">
            {workflowFeedback.items.map((it) => (
              <li
                key={it}
                className="font-mono text-xs leading-relaxed text-(--text-secondary)"
              >
                <span className="text-(--accent)">↩ </span>
                {it}
              </li>
            ))}
          </ul>
          <p className="caption-mono mt-3">
            A → B → C, with a feedback arrow from C back to B.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

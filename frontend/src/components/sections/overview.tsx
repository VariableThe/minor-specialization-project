"use client";

import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export function OverviewSection() {
  return (
    <Section
      id="overview"
      eyebrow="in plain english"
      title="What this is, and what we actually found"
      description="When you walk, your phone and watch feel the motion through their accelerometers and gyroscopes — tiny sensors that measure how you move. Your stride, your rhythm and your posture all leave a signature in that signal. Gait authentication is the idea that this signature is personal enough to recognise you: instead of typing a password or pressing a fingerprint, the device just knows it is still you because it recognises how you move."
    >
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
            This project built and tested that idea end to end. We took public
            walking data, trained neural networks to recognise both what
            someone is doing (walking, sitting, standing, climbing stairs) and
            who is doing it, and then measured how often the system gets it
            wrong.
          </p>
        </Reveal>

        <Reveal className="mt-6">
          <p className="caption-mono">three things we can say with confidence</p>
          <ul className="mt-3 space-y-3">
            <li className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              <span className="font-mono text-xs text-(--accent)">01 </span>
              Recognising the activity works well — the best model is right
              about 93% of the time, and when it is wrong it is usually mixing
              up sitting and standing.
            </li>
            <li className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              <span className="font-mono text-xs text-(--accent)">02 </span>
              Recognising the person got meaningfully better — the headline
              error rate was cut roughly in half, from about 20% down to about
              10%.
            </li>
            <li className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              <span className="font-mono text-xs text-(--accent)">03 </span>
              Recognising someone on a different day, from a leg-mounted
              sensor, reached a 7% error rate with a 0.99 quality score.
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-6">
          <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
            What we cannot say yet: this is not ready for your phone. The
            errors are still too high for real security, and performance
            collapses when the sensor is tilted or the signal gets noisy.
            Every experiment so far used small, controlled datasets, not a real
            phone in a real pocket.
          </p>
        </Reveal>

        <Reveal className="mt-4">
          <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
            The most important thing we did was refuse to oversell it. We ran
            dozens of experiments where promising ideas did not pan out —
            better orientation maths, more data, different models — and we
            recorded those failures instead of hiding them. That rigour is the
            real result of this project, more than any single number.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

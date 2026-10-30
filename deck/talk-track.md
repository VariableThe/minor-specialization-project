---
title: Gait Biometrics — 2–3 Minute Talk Track
author: Amaan, Aditya, Nimisha · MAHE
date: 2026-10-27
---

# Point-by-point speaking notes

**Target: 2–3 minutes.** Say only what is on the slide; the graphs do the arguing.
Numbers live in the deck's speaker notes — mention at most one per slide.

- **Slide 1 — Title.** *(5 s)*

    - "We authenticate a person by how they walk — no password, no fingerprint."

- **Slide 2 — The idea.** *(10 s)*

    - Phone and watch IMUs feel every stride; the rhythm and posture leave a personal signature.
    - Goal: the device recognises you continuously, in the background.

- **Slide 3 — EER collapse.** *(15 s)*

    - Historical baseline vs metric learning, on both datasets.
    - Error halves; the dashed line shows where each method started.
    - One number: WISDM EER ~20% → ~10%.

- **Slide 4 — Cross-day.** *(10 s)*

    - Same story on the harder cross-day split — improvement survives time.

- **Slide 5 — Four methods.** *(10 s)*

    - One falling error line across all four paper methods — the comparison is consistent, not a one-off.

- **Slide 6 — Orientation.** *(15 s)*

    - Three device configurations: control, canonical fixed, canonical flipped.
    - Errors stay in the same band — orientation handling works, but nothing is free.

- **Slide 7 — Stress.** *(20 s — the honest slide)*

    - Clean walking vs rotated/noisy signals.
    - False-rejection explodes under stress — up to total lockout.
    - Say it plainly: "this is our weak point, and it is where future work goes."

- **Slide 8 — Activity classification.** *(15 s)*

    - UCI HAR, six models within a few percent of each other.
    - Note the y-axis starts at 80% — differences are real but small.

- **Slide 9 — Scaling study.** *(10 s)*

    - Mean fold EER by method; the deep models are worth their cost, the simplest ones are not far behind.

- **Slide 10 — Speedups.** *(15 s)*

    - Every pipeline stage got faster moving CPU → CUDA; windowing alone ~15×.
    - Total measured gains make on-device deployment plausible.

- **Slide 11 — Paper → implementation map.** *(10 s)*

    - Each paper component → our module; B1–B7 keep us honest about what was replicated.

- **Slide 12 — Workflow.** *(10 s)*

    - Amaan: data pipeline · Aditya: deep learning · Nimisha: evaluation.

- **Slide 13 — Closing.** *(10 s)*

    - Takeaway: passive authentication works in fair conditions; stress robustness is the open problem.
    - Thank the mentor (Manjunath Hegde) and invite questions.

## Pacing

- 13 slides, about 135 s of talking plus transitions, i.e. **2:15–2:45** total.
- If running long: cut the commentary on slides 4, 9 and 11 — keep slides 3 and 7, they carry the story.
- If running short: add the caveats from the deck's speaker notes (small sample sizes, per-subject variance).
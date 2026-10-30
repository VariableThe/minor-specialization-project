# GaitBiometrics — results dashboard

The web front end for our Minor Specialization Project on gait-based user
authentication (MAHE). It presents the full project — activity classification,
verification EER improvements, the cross-day Santos evaluation, robustness
stress tests, engineering speedups and the paper-to-implementation map — as an
interactive single-page dashboard with charts styled to a consistent dark theme.

All numbers on the site come from one file, [`src/lib/data.ts`](src/lib/data.ts),
so every metric is sourced from the recorded experiment results and can be
updated in one place.

## Stack

- [Next.js](https://nextjs.org) (App Router) with static export of a single page
- TypeScript, CSS custom properties (no CSS framework for theming)
- Charts drawn with inline SVG, animated with CSS transitions
- DM Sans + Geist Mono via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run start    # serve the production build
```

## Structure

```
src/
  app/            # layout, page, global styles and theme tokens
  components/
    sections/     # one component per dashboard section (hero, activity, ...)
    ui/           # small shared building blocks
  lib/data.ts     # single source of truth for every metric shown
```

## Team

Amaan (data pipeline), Aditya (deep learning), Nimisha (evaluation) —
mentored by Manjunath Hegde. The research hub with reports, papers and
deliverables lives at
[github.com/VariableThe/minor-specialization-project](https://github.com/VariableThe/minor-specialization-project).
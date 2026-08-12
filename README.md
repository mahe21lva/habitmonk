# The Habit Monk — thehabitmonk.com

A record of one mind changing. Built on Astro (static), no CSS framework —
the whole theme ("The Study") is hand-authored CSS with design tokens in
`src/styles/global.css`.

## Run

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to /dist
```

## Add content

Everything is a markdown file. Drop a new `.md` into the right folder and the
site rebuilds itself.

- `src/content/society/`  — living positions. Frontmatter: `title`, `date`,
  `status` (`forming` | `held` | `revised`), `summary`. Body = the full piece,
  including how the view has changed.
- `src/content/articles/` — essays. Frontmatter: `title`, `date`, `excerpt`,
  `topic` (`work` | `citizen`).
- `src/content/readings/` — finished books. `title`, `author`, `finished`,
  `note`.
- `src/content/readlist/` — the queue. `title`, `author`, `why`.

## Design tokens

All colour and type lives in `:root` in `src/styles/global.css`. Change the
palette there and it propagates everywhere.

- Navy `#22405E` · gold `#A67C2E` · cream `#FAF6EC` — drawn from the logo.
- Display: Fraunces · Body: EB Garamond · Meta: Space Grotesk.

## The Atlas watermark

The faint figure on the home hero is an inline SVG placeholder in
`src/pages/index.astro`. Export the real logo as an SVG, drop it in
`public/atlas.svg`, and replace the inline `<svg class="atlas">…</svg>` block
with `<img class="atlas" src="/atlas.svg" alt="" />`. Keep opacity ~0.07.

## Deploy (as before)

Push to GitHub, import to Vercel. Framework preset: Astro. In Hostinger, point
the domain at Vercel (A record `76.76.21.21`, plus the Vercel-provided CNAME).

# mzpeak.org

The landing site for the **mzPeak** mass spectrometry data format → **www.mzpeak.org**.

A minimal, static [VitePress](https://vitepress.dev) site. Four pages: home, About, Tools, Examples.

## Develop

```bash
npm install
npm run dev        # local preview at http://localhost:5173
```

## Build

```bash
npm run build      # static output → .vitepress/dist
npm run preview    # serve the built site
```

## Structure

```
.
├── index.md              # home (hero + feature cards)
├── about.md              # what / why mzPeak
├── tools.md              # spec, reference impl, converter, validator, viewers
├── examples.md           # live data corpus + browser viewers
├── .vitepress/config.mts # site config (nav, theme)
├── public/
│   ├── CNAME             # www.mzpeak.org (GitHub Pages custom domain)
│   ├── logo.svg          # wordmark / favicon
│   └── illustrations/    # diagrams + an illustration brief (what art to add)
└── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo: **Settings → Pages → Source: GitHub Actions**, and set the custom domain to
`www.mzpeak.org` (the `public/CNAME` file pins it). Point the DNS `CNAME` for `www` at
`okohlbacher.github.io`.

## Content notes

Copy is intentionally minimal — see each page. Illustrations currently ship as simple placeholder SVGs;
`public/illustrations/README.md` lists the real artwork to produce.

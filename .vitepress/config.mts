import { defineConfig } from 'vitepress'

// Minimal landing site for mzPeak → www.mzpeak.org
// With the custom domain (www.mzpeak.org) base stays '/'. When deploying to the
// GitHub Pages project URL (okohlbacher.github.io/mzpeak.org/) the CI sets
// GITHUB_PAGES=true so assets resolve under the /mzpeak.org/ path instead.
const base = process.env.GITHUB_PAGES === 'true' ? '/mzpeak.org/' : '/'

export default defineConfig({
  base,
  title: 'mzPeak',
  description: 'The modern, compact, cloud-native mass spectrometry data format.',
  cleanUrls: true,
  lang: 'en-US',

  // /spec/ is the MkDocs spec, composed onto the same origin at deploy time —
  // it is not a VitePress route, so exclude it from the dead-link check.
  ignoreDeadLinks: [/^\/spec(\/|$)/],

  // The design system is light-only (a dark "data stage" appears only inside
  // the landing hero/CTA); disable the default theme's dark-mode toggle.
  appearance: false,

  // Content lives at the repo root; keep these out of the page graph.
  // The design_handoff_* tree is a design reference, not site content.
  srcExclude: ['README.md', '**/illustrations/README.md', 'design_handoff_*/**'],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}mark.png` }],
    ['meta', { property: 'og:title', content: 'mzPeak — the modern mass spectrometry data format' }],
    ['meta', { property: 'og:description', content: 'Compact, fast, cloud-native. A Parquet-in-ZIP successor to mzML, open and CV-governed by HUPO-PSI.' }],
    ['meta', { property: 'og:image', content: `${base}logo.png` }],
  ],

  themeConfig: {
    // Match the landing header's brand lockup: the square peaks mark + a "mzPeak"
    // site title. Keeping siteTitle (rather than a hidden wordmark) also gives the
    // home link an accessible name for assistive tech.
    logo: { src: '/mark.png', alt: 'mzPeak' },
    siteTitle: 'mzPeak',
    nav: [
      { text: 'Governance', link: '/about' },
      { text: 'Tools', link: '/tools' },
      { text: 'Try it', link: '/examples' },
      { text: 'Supporters', link: '/supporters' },
      { text: 'Contact', link: '/contact' },
      { text: 'Specification', link: '/spec/', target: '_self' },
    ],
    sidebar: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HUPO-PSI' },
    ],
    search: { provider: 'local' },
    footer: {
      message: 'An open <a href="https://www.psidev.info/">HUPO-PSI</a> community format.',
      copyright: '© 2026 the mzPeak contributors',
    },
  },
})

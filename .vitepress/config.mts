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

  // Canonical production origin — used for absolute OG/Twitter image URLs and the
  // sitemap. Social scrapers (Slack/Twitter/LinkedIn) require an ABSOLUTE og:image,
  // so it is hardcoded to the live host rather than the (relative) base path.
  sitemap: { hostname: 'https://www.mzpeak.org' },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}mark.png` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'mzPeak' }],
    ['meta', { property: 'og:url', content: 'https://www.mzpeak.org/' }],
    ['meta', { property: 'og:title', content: 'mzPeak — the modern mass spectrometry data format' }],
    ['meta', { property: 'og:description', content: 'Compact, fast, cloud-native. A Parquet-in-ZIP successor to mzML, open and CV-governed by HUPO-PSI.' }],
    ['meta', { property: 'og:image', content: 'https://www.mzpeak.org/og-card.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'mzPeak — the modern mass spectrometry data format' }],
    ['meta', { name: 'twitter:description', content: 'Compact, fast, cloud-native. A Parquet-in-ZIP successor to mzML, open and CV-governed by HUPO-PSI.' }],
    ['meta', { name: 'twitter:image', content: 'https://www.mzpeak.org/og-card.png' }],
  ],

  themeConfig: {
    // Match the landing header's brand lockup: the square peaks mark + a "mzPeak"
    // site title. Keeping siteTitle (rather than a hidden wordmark) also gives the
    // home link an accessible name for assistive tech.
    logo: { src: '/mark.png', alt: 'mzPeak' },
    siteTitle: 'mzPeak',
    nav: [
      { text: 'Why mzPeak', link: '/why' },
      { text: 'Specification', link: '/spec/', target: '_self' },
      { text: 'Tools', link: '/tools' },
      { text: 'Try it', link: '/examples' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Roadmap', link: '/roadmap' },
      {
        text: 'Project',
        items: [
          { text: 'Governance', link: '/about' },
          { text: 'Supporters', link: '/supporters' },
          { text: 'Contact', link: '/contact' },
        ],
      },
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

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
    // The official mzPeak wordmark (peak mark + "mzPeak"); hide the duplicate title text.
    logo: '/logo.png',
    siteTitle: false,
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Tools', link: '/tools' },
      { text: 'Examples', link: '/examples' },
      { text: 'Supporters', link: '/supporters' },
      { text: 'Contact', link: '/contact' },
      { text: 'Specification ↗', link: 'https://hupo-psi.github.io/mzPeak-specification/' },
    ],
    sidebar: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HUPO-PSI/mzPeak' },
    ],
    search: { provider: 'local' },
    footer: {
      message: 'An open <a href="https://www.psidev.info/">HUPO-PSI</a> community format.',
      copyright: '© 2026 the mzPeak contributors',
    },
  },
})

import { defineConfig } from 'vitepress'

// Minimal landing site for mzPeak → www.mzpeak.org
// Custom domain at the apex/www, so base stays '/'.
export default defineConfig({
  title: 'mzPeak',
  description: 'The modern, compact, cloud-native mass spectrometry data format.',
  cleanUrls: true,
  lang: 'en-US',

  // Content lives at the repo root; keep these out of the page graph.
  srcExclude: ['README.md', '**/illustrations/README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/mark.png' }],
    ['meta', { property: 'og:title', content: 'mzPeak — the modern mass spectrometry data format' }],
    ['meta', { property: 'og:description', content: 'Compact, fast, cloud-native. A Parquet-in-ZIP successor to mzML, open and CV-governed by HUPO-PSI.' }],
    ['meta', { property: 'og:image', content: '/logo.png' }],
  ],

  themeConfig: {
    // The official mzPeak wordmark (peak mark + "mzPeak"); hide the duplicate title text.
    logo: '/logo.png',
    siteTitle: false,
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Tools', link: '/tools' },
      { text: 'Examples', link: '/examples' },
      { text: 'Specification ↗', link: 'https://github.com/HUPO-PSI/mzPeak-specification' },
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

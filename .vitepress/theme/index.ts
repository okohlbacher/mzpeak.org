import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

// Extends the VitePress default theme: content pages keep the default
// doc/page layouts (branded via custom.css); the landing page swaps in a
// fully custom Home component.
export default {
  extends: DefaultTheme,
  Layout,
}

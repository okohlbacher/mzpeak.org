<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Home v-if="frontmatter.home" />
  <component :is="DefaultLayout" v-else />
</template>

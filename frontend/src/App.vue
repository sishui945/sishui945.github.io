<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

useHead({
  titleTemplate: '%s | 似水Sishui',
  meta: [
    { name: 'description', content: '似水Sishui 的个人网站 —— 博客、教程、项目集' },
    { name: 'keywords', content: '似水Sishui,博客,教程,C++,全栈开发' },
    { property: 'og:title', content: '似水Sishui的个人网站' },
    { property: 'og:description', content: '博客、教程、项目集。边学边做，持续迭代。' },
  ],
  link: [
    { rel: 'icon', href: '/logo.png' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

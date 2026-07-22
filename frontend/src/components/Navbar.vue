<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const mobileOpen = ref(false)
</script>

<template>
  <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/60 dark:border-gray-700/60">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center" aria-label="主导航">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <img src="/logo.png" alt="似水Sishui 头像" class="w-8 h-8 rounded-md" />
        <span class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display">
          似水Sishui
        </span>
      </RouterLink>

      <!-- 桌面端链接 -->
      <ul class="hidden md:flex items-center space-x-8 text-sm">
        <li>
          <RouterLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200" active-class="text-indigo-600 dark:text-indigo-400">
            首页
          </RouterLink>
        </li>
        <li>
          <a href="/#about" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">关于</a>
        </li>
        <li>
          <a href="/#projects" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">项目</a>
        </li>

        <li>
          <a href="/#contact" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">联系</a>
        </li>
        <li>
          <RouterLink to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200" active-class="text-indigo-600 dark:text-indigo-400">
            博客
          </RouterLink>
        </li>
      </ul>

      <!-- 右侧：暗色切换 + 汉堡菜单 -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <button
          type="button"
          class="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="打开菜单"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div v-if="mobileOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 space-y-3">
      <RouterLink to="/" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium" @click="mobileOpen = false">首页</RouterLink>
      <a href="/#about" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium" @click="mobileOpen = false">关于</a>
      <a href="/#projects" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium" @click="mobileOpen = false">项目</a>

      <a href="/#contact" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium" @click="mobileOpen = false">联系</a>
      <RouterLink to="/blog" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium" @click="mobileOpen = false">博客</RouterLink>
    </div>
  </header>
</template>

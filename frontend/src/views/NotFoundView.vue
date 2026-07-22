<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
    <p class="text-6xl mb-4 font-display font-bold text-gray-300 dark:text-gray-700">404</p>
    <h1 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">页面未找到</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-6">你访问的页面不存在</p>
    <RouterLink
      to="/"
      class="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
    >
      返回首页
    </RouterLink>
  </div>
</template>

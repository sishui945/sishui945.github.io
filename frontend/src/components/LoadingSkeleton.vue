<script setup lang="ts">
defineProps<{ type: 'list' | 'detail' }>()
</script>

<template>
  <!-- 列表骨架 -->
  <div v-if="type === 'list'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div v-for="n in 4" :key="n" class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
      <div class="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
      <div class="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse mb-1" />
      <div class="h-4 w-2/3 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
    </div>
  </div>

  <!-- 详情骨架 -->
  <div v-else>
    <div class="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
    <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8" />
    <div v-for="n in 5" :key="n" class="h-4 bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse mb-3" :class="n === 5 ? 'w-1/2' : 'w-full'" />
    <div class="flex gap-2 mt-6">
      <div v-for="n in 2" :key="n" class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    </div>
  </div>
</template>

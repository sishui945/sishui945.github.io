<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 mb-8">
    <button
      :class="[
        'px-4 py-1.5 text-sm rounded-full border transition-colors duration-200',
        store.activeTag === null
          ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400',
      ]"
      @click="store.setActiveTag(null)"
    >
      全部
    </button>
    <button
      v-for="tag in store.tags"
      :key="tag.slug"
      :class="[
        'px-4 py-1.5 text-sm rounded-full border transition-colors duration-200',
        store.activeTag === tag.slug
          ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400',
      ]"
      @click="store.setActiveTag(tag.slug)"
    >
      {{ tag.name }}
    </button>
  </div>
</template>

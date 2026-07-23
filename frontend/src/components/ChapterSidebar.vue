<script setup lang="ts">
import type { ChapterSummary } from '@/stores/tutorials'

defineProps<{
  tutorialTitle: string
  tutorialSlug: string
  chapters: ChapterSummary[]
  currentChapterSlug?: string
}>()
</script>

<template>
  <aside class="hidden lg:block w-44 shrink-0">
    <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4">
      <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 truncate" :title="tutorialTitle">
        {{ tutorialTitle }}
      </p>
      <ul v-if="chapters.length > 0" class="space-y-0.5">
        <li v-for="ch in chapters" :key="ch.slug">
          <RouterLink
            :to="`/tutorials/${tutorialSlug}/${ch.slug}`"
            :class="[
              'block text-sm py-1.5 px-2 rounded transition-colors truncate',
              ch.slug === currentChapterSlug
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
            ]"
          >
            {{ ch.order }}. {{ ch.title }}
          </RouterLink>
        </li>
      </ul>
      <p v-else class="text-xs text-gray-400 dark:text-gray-500">暂无章节</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostSummary } from '@/stores/posts'

const props = defineProps<{ post: PostSummary }>()

const dateStr = computed(() =>
  new Date(props.post.publishedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
)
</script>

<template>
  <article class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <time :datetime="post.publishedAt" class="text-xs text-gray-500 dark:text-gray-400">{{ dateStr }}</time>
    <h2 class="text-lg font-bold mt-1 mb-2 dark:text-white">
      <RouterLink :to="`/blog/${post.slug}`" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        {{ post.title }}
      </RouterLink>
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
    <div class="flex flex-wrap gap-1.5">
      <span
        v-for="tag in post.tags"
        :key="tag.slug"
        class="px-2 py-0.5 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800"
      >
        {{ tag.name }}
      </span>
    </div>
  </article>
</template>

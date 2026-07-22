<script setup lang="ts">
import { computed } from 'vue'
import { usePostsStore } from '@/stores/posts'

const props = defineProps<{ currentSlug: string }>()
const store = usePostsStore()

const sorted = computed(() =>
  [...store.list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
)
</script>

<template>
  <aside class="hidden lg:block w-48 shrink-0">
    <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4">
      <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">文章列表</p>
      <ul class="space-y-0.5">
        <li v-for="post in sorted" :key="post.id">
          <RouterLink
            :to="`/blog/${post.slug}`"
            :class="[
              'block text-sm py-1.5 px-2 rounded-lg transition-colors truncate',
              post.slug === props.currentSlug
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
            ]"
          >
            {{ post.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

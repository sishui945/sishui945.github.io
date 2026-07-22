<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()

const latestPosts = computed(() => store.list.slice(0, 2))

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  if (store.list.length === 0) {
    store.fetchList()
  }
})
</script>

<template>
  <section id="blog" class="py-20 px-6 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-12 text-center">
        最新文章
      </h2>

      <!-- 加载中 -->
      <div v-if="store.loading" class="text-center text-gray-500 dark:text-gray-400 py-12">
        <div class="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />
        <p>加载中...</p>
      </div>

      <!-- 错误 -->
      <div v-else-if="store.error" class="text-center text-red-500 dark:text-red-400 py-12">
        <p>加载失败：{{ store.error }}</p>
      </div>

      <!-- 文章列表 -->
      <div v-else-if="latestPosts.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RouterLink
          v-for="post in latestPosts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
        >
          <div class="flex items-center gap-3 mb-3">
            <time class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(post.publishedAt) }}</time>
            <span
              v-for="tag in post.tags"
              :key="tag.slug"
              class="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300"
            >
              {{ tag.name }}
            </span>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ post.title }}
          </h3>

          <p v-if="post.excerpt" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ post.excerpt }}
          </p>

          <div class="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-3 inline-flex items-center gap-1 transition-all">
            阅读更多
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </RouterLink>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-12">
        <p>暂无文章</p>
      </div>

      <!-- 查看全部 -->
      <div v-if="!store.loading" class="text-center mt-10">
        <RouterLink
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
        >
          查看全部文章
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

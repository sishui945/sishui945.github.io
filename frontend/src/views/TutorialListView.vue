<script setup lang="ts">
import { onMounted } from 'vue'
import { useTutorialsStore } from '@/stores/tutorials'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const store = useTutorialsStore()

onMounted(async () => {
  await store.fetchCategories()
})
</script>

<template>
  <div class="py-20 px-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="font-display text-3xl md:text-4xl font-bold dark:text-white mb-2">教程</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-10">按分类浏览，系统化学习</p>

      <LoadingSkeleton v-if="store.loading" type="list" />

      <div v-else-if="store.error" class="text-center py-20">
        <p class="text-red-500">{{ store.error }}</p>
      </div>

      <template v-else>
        <!-- 按分类分组展示 -->
        <div v-for="cat in store.categories" :key="cat.id" class="mb-12">
          <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{{ cat.name }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RouterLink
              v-for="t in cat.tutorials"
              :key="t.id"
              :to="`/tutorials/${t.slug}`"
              class="block p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all group"
            >
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {{ t.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                {{ t.description || `${t.chapters.length} 个章节` }}
              </p>
              <span class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {{ t.chapters.length }} 章 →
              </span>
            </RouterLink>
          </div>
        </div>

        <div v-if="store.categories.length === 0" class="text-center py-20">
          <p v-if="store.categoriesError" class="text-red-500">加载分类失败，请稍后重试</p>
          <p v-else class="text-gray-400 dark:text-gray-500">暂无教程</p>
        </div>
      </template>
    </div>
  </div>
</template>

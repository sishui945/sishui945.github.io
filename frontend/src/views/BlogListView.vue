<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import TagFilter from '@/components/TagFilter.vue'
import BlogCard from '@/components/BlogCard.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const store = usePostsStore()

onMounted(async () => {
  store.activeTag = null
  // 避免重复请求：如果没有列表数据才 fetch，否则只更新 tags
  await Promise.all([
    store.list.length === 0 ? store.fetchList() : Promise.resolve(),
    store.tags.length === 0 ? store.fetchTags() : Promise.resolve(),
  ])
})
</script>

<template>
  <section class="py-20 px-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="font-display text-3xl font-bold mb-2 dark:text-white">全部文章</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">学习笔记、踩坑记录、项目复盘</p>

      <TagFilter />

      <LoadingSkeleton v-if="store.loading" type="list" />

      <div v-else-if="store.error" class="text-center py-12 text-red-500">
        {{ store.error }}
      </div>

      <div v-else-if="store.list.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-500">
        没有匹配的文章
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlogCard v-for="post in store.list" :key="post.id" :post="post" />
      </div>
    </div>
  </section>
</template>

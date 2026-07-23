<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useTutorialsStore, type ChapterSummary } from '@/stores/tutorials'
import ChapterSidebar from '@/components/ChapterSidebar.vue'
import CategoryTree from '@/components/CategoryTree.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const route = useRoute()
const store = useTutorialsStore()

const slug = computed(() => route.params.slug as string)
const chapterSlug = computed(() => route.params.chapterSlug as string | undefined)

const chapters = computed<ChapterSummary[]>(() => {
  if (store.chapter?.tutorial?.chapters) return store.chapter.tutorial.chapters
  if (store.tutorial?.chapters) return store.tutorial.chapters
  return []
})

const chapter = computed(() => store.chapter)
const tutorial = computed(() => store.tutorial)

const currentIndex = computed(() => chapters.value.findIndex(c => c.slug === chapterSlug.value))
const prevChapter = computed(() => currentIndex.value > 0 ? chapters.value[currentIndex.value - 1] : null)
const nextChapter = computed(() => currentIndex.value < chapters.value.length - 1 ? chapters.value[currentIndex.value + 1] : null)

// marked 配置
marked.use({
  renderer: {
    heading({ text, depth }) {
      const id = text.toLowerCase().replace(/[^\w一-鿿]+/g, '-').replace(/^-+|-+$/g, '')
      return `<h${depth} id="${id}">${text}</h${depth}>`
    },
    link({ href, title, text }) {
      const t = title ? ` title="${title}"` : ''
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${t}>${text}</a>`
    },
  },
})

const renderedContent = computed(() => {
  if (!chapter.value) return ''
  return marked.parse(chapter.value.content, { async: false }) as string
})

async function loadContent() {
  if (chapterSlug.value) {
    await store.fetchChapter(slug.value, chapterSlug.value)
  } else {
    const t = await store.fetchTutorial(slug.value)
    if (t?.chapters?.[0]) {
      await store.fetchChapter(slug.value, t.chapters[0].slug)
    }
  }
}

onMounted(async () => {
  await Promise.all([loadContent(), store.fetchCategories()])
})

watch([() => slug.value, () => chapterSlug.value], async () => {
  await loadContent()
  window.scrollTo(0, 0)
})

watchEffect(() => {
  if (chapter.value) {
    document.title = `${chapter.value.title} | ${chapter.value.tutorial?.title || ''} | 似水Sishui`
  }
})

onUnmounted(() => {
  store.tutorial = null
  store.chapter = null
})
</script>

<template>
  <div class="py-20 px-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <RouterLink
        to="/tutorials"
        class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        返回全部教程
      </RouterLink>

      <div class="flex gap-8">
        <!-- 左栏：章节目录 -->
        <ChapterSidebar
          v-if="tutorial"
          :tutorial-title="tutorial.title"
          :tutorial-slug="tutorial.slug"
          :chapters="chapters"
          :current-chapter-slug="chapterSlug ?? chapters[0]?.slug"
        />

        <!-- 中栏：正文 -->
        <div class="min-w-0 flex-1 max-w-3xl">
          <LoadingSkeleton v-if="store.loading" type="detail" />

          <div v-else-if="store.error" class="text-center py-20">
            <p class="text-red-500">{{ store.error }}</p>
          </div>

          <div v-else-if="!chapter" class="text-center py-20">
            <p class="text-6xl mb-4">📖</p>
            <h1 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">章节未找到</h1>
            <RouterLink to="/tutorials" class="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              返回全部教程
            </RouterLink>
          </div>

          <template v-else>
            <!-- 上翻页 -->
            <div class="flex justify-between items-center mb-6 text-sm">
              <RouterLink
                v-if="prevChapter"
                :to="`/tutorials/${slug}/${prevChapter.slug}`"
                class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                {{ prevChapter.title }}
              </RouterLink>
              <span v-else />

              <RouterLink
                v-if="nextChapter"
                :to="`/tutorials/${slug}/${nextChapter.slug}`"
                class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                {{ nextChapter.title }}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </RouterLink>
              <span v-else />
            </div>

            <!-- 章节标题 -->
            <header class="mb-10">
              <h1 class="font-display text-3xl md:text-4xl font-bold dark:text-white mb-4 leading-tight">
                {{ chapter.title }}
              </h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ chapter.tutorial?.title }} · 第 {{ currentIndex + 1 }} / {{ chapters.length }} 节
              </p>
            </header>

            <!-- 正文 -->
            <div class="post-content" v-html="renderedContent" />

            <!-- 下翻页 -->
            <div class="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <RouterLink
                v-if="prevChapter"
                :to="`/tutorials/${slug}/${prevChapter.slug}`"
                class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                上一节：{{ prevChapter.title }}
              </RouterLink>
              <span v-else />

              <RouterLink
                v-if="nextChapter"
                :to="`/tutorials/${slug}/${nextChapter.slug}`"
                class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 text-sm"
              >
                下一节：{{ nextChapter.title }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </RouterLink>
              <span v-else />
            </div>
          </template>
        </div>

        <!-- 右栏：分类导航 -->
        <aside class="hidden lg:block w-48 shrink-0">
          <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4">
            <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">分类导航</p>
            <div v-if="store.categories.length > 0">
              <CategoryTree
                v-for="cat in store.categories"
                :key="cat.id"
                :node="cat"
                :current-tutorial-slug="slug"
              />
            </div>
            <p v-else class="text-xs text-gray-400">加载中...</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style>
/* 与 BlogDetailView 相同的 post-content 样式 */
.post-content h2 { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; }
.post-content h3 { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
.post-content p { color: #374151; line-height: 1.75; margin-bottom: 1rem; }
.dark .post-content p { color: #d1d5db; }
.post-content a { color: #4f46e5; text-decoration: underline; }
.dark .post-content a { color: #818cf8; }
.post-content a:hover { color: #4338ca; }
.post-content strong { font-weight: 700; color: #111827; }
.dark .post-content strong { color: #f9fafb; }
.post-content pre { background: #1e293b; border-radius: 0.75rem; padding: 1.25rem; overflow-x: auto; margin-bottom: 1.5rem; font-size: 0.875rem; line-height: 1.6; }
.dark .post-content pre { background: #0f172a; }
.post-content code { font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.875em; }
.post-content :not(pre) > code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; color: #374151; }
.dark .post-content :not(pre) > code { background: #374151; color: #e5e7eb; }
.post-content blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; font-style: italic; color: #6b7280; margin-bottom: 1rem; }
.post-content img { border-radius: 0.75rem; margin: 1.5rem 0; }
.post-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.875rem; }
.post-content th { border: 1px solid #d1d5db; padding: 0.5rem 1rem; background: #f9fafb; font-weight: 700; }
.dark .post-content th { border-color: #4b5563; background: #1f2937; }
.post-content td { border: 1px solid #d1d5db; padding: 0.5rem 1rem; }
.dark .post-content td { border-color: #4b5563; }
</style>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { usePostsStore } from '@/stores/posts'
import PostSidebar from '@/components/PostSidebar.vue'
import TocSidebar from '@/components/TocSidebar.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

interface TocItem {
  level: number
  text: string
  id: string
  children: TocItem[]
}

const route = useRoute()
const store = usePostsStore()
const tocOpen = ref(false)
const tocTree = ref<TocItem[]>([])

const slug = computed(() => route.params.slug as string)

const dateStr = computed(() => {
  if (!store.current) return ''
  return new Date(store.current.publishedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})

// === marked 配置 ===
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

// === 提取树形目录 ===
function extractToc(md: string): TocItem[] {
  const re = /^(#{2,3})\s+(.+)$/gm
  const flat: { level: number; text: string; id: string }[] = []
  let m
  while ((m = re.exec(md)) !== null) {
    const text = m[2].trim()
    flat.push({
      level: m[1].length,
      text,
      id: text.toLowerCase().replace(/[^\w一-鿿]+/g, '-').replace(/^-+|-+$/g, ''),
    })
  }
  const tree: TocItem[] = []
  let cur: TocItem | null = null
  for (const h of flat) {
    if (h.level === 2) {
      cur = { ...h, children: [] }
      tree.push(cur)
    } else if (h.level === 3 && cur) {
      cur.children.push({ ...h, children: [] })
    }
  }
  return tree
}

// === 生命周期 ===
onMounted(async () => {
  await Promise.all([store.fetchBySlug(slug.value), store.fetchList()])
})

const renderedContent = computed(() => {
  if (!store.current) return ''
  return marked.parse(store.current.content, { async: false }) as string
})

watchEffect(() => {
  if (store.current) {
    document.title = `${store.current.title} | 似水Sishui`
    tocTree.value = extractToc(store.current.content)
  }
})

onUnmounted(() => {
  store.current = null
})
</script>

<template>
  <article class="py-20 px-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- 返回链接 -->
      <RouterLink
        to="/blog"
        class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        返回全部文章
      </RouterLink>

      <div class="flex gap-8">
        <PostSidebar :current-slug="slug" />

        <div class="min-w-0 flex-1 max-w-3xl">
          <!-- 加载中 -->
          <LoadingSkeleton v-if="store.loading" type="detail" />

          <!-- 错误 -->
          <div v-else-if="store.error" class="text-center py-20">
            <p class="text-red-500">{{ store.error }}</p>
          </div>

          <!-- 404 -->
          <div v-else-if="!store.current" class="text-center py-20">
            <p class="text-6xl mb-4">📄</p>
            <h1 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">文章未找到</h1>
            <RouterLink to="/blog" class="inline-block mt-6 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              返回全部文章
            </RouterLink>
          </div>

          <!-- 文章内容 -->
          <template v-else>
            <header class="mb-10">
              <h1 class="font-display text-3xl md:text-4xl font-bold dark:text-white mb-4 leading-tight">
                {{ store.current.title }}
              </h1>
              <time :datetime="store.current.publishedAt" class="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
                {{ dateStr }}
              </time>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in store.current.tags"
                  :key="tag.slug"
                  class="px-3 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800"
                >
                  {{ tag.name }}
                </span>
              </div>
            </header>

            <div class="post-content" v-html="renderedContent" />

            <!-- 底部导航 -->
            <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <RouterLink
                to="/blog"
                class="inline-flex items-center gap-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                返回全部文章
              </RouterLink>
            </div>
          </template>
        </div>

        <TocSidebar :headings="tocTree" />

        <!-- 移动端 TOC FAB -->
        <button
          v-if="tocTree.length > 0"
          class="fixed bottom-6 right-6 lg:hidden w-12 h-12 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center text-xl z-40"
          @click="tocOpen = !tocOpen"
        >
          📑
        </button>
        <!-- 移动端 TOC 抽屉 -->
        <Teleport to="body">
          <div v-if="tocOpen" class="fixed inset-0 z-50 lg:hidden">
            <div class="absolute inset-0 bg-black/50" @click="tocOpen = false" />
            <div class="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-6 overflow-y-auto shadow-xl">
              <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">本文目录</p>
              <ul class="space-y-0">
                <li v-for="h2 in tocTree" :key="h2.id">
                  <a
                    :href="`#${h2.id}`"
                    class="block text-sm py-1.5 px-2 text-gray-600 dark:text-gray-300"
                    @click="tocOpen = false"
                  >{{ h2.text }}</a>
                  <ul v-if="h2.children.length > 0">
                    <li v-for="h3 in h2.children" :key="h3.id">
                      <a
                        :href="`#${h3.id}`"
                        class="block text-xs py-1.5 pl-4 text-gray-400 dark:text-gray-500"
                        @click="tocOpen = false"
                      >{{ h3.text }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Teleport>
      </div>
    </div>
  </article>
</template>

<style>
/* === Markdown 渲染样式（不能 scoped，因为 v-html 的内容没有 scoped data 属性） === */
.post-content h2 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.post-content h3 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.post-content p {
  color: #374151;
  line-height: 1.75;
  margin-bottom: 1rem;
}
.dark .post-content p { color: #d1d5db; }
.post-content a { color: #4f46e5; text-decoration: underline; }
.dark .post-content a { color: #818cf8; }
.post-content a:hover { color: #4338ca; }
.post-content strong { font-weight: 700; color: #111827; }
.dark .post-content strong { color: #f9fafb; }
.post-content ul, .post-content ol { padding-left: 1.5rem; margin-bottom: 1rem; color: #374151; }
.dark .post-content ul, .dark .post-content ol { color: #d1d5db; }
.post-content li { margin-bottom: 0.25rem; }
.post-content pre {
  background: #1e293b;
  border-radius: 0.75rem;
  padding: 1.25rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
.dark .post-content pre { background: #0f172a; }
.post-content code { font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.875em; }
.post-content :not(pre) > code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: #374151;
}
.dark .post-content :not(pre) > code { background: #374151; color: #e5e7eb; }
.post-content pre code { background: none; padding: 0; color: #e2e8f0; }
.post-content blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
  margin-bottom: 1rem;
}
.post-content img { border-radius: 0.75rem; margin: 1.5rem 0; }
.post-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.875rem; }
.post-content th { border: 1px solid #d1d5db; padding: 0.5rem 1rem; background: #f9fafb; font-weight: 700; }
.dark .post-content th { border-color: #4b5563; background: #1f2937; }
.post-content td { border: 1px solid #d1d5db; padding: 0.5rem 1rem; }
.dark .post-content td { border-color: #4b5563; }
.post-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
.dark .post-content hr { border-color: #374151; }
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface TocItem {
  level: number
  text: string
  id: string
  children: TocItem[]
}

defineProps<{ headings: TocItem[] }>()
const activeId = ref<string | null>(null)

let rafId = 0

function updateActive() {
  const headings = document.querySelectorAll<HTMLElement>('.post-content h2[id], .post-content h3[id]')
  if (headings.length === 0) { activeId.value = null; return }

  // 找到第一个仍在视口顶部阈值之下的标题（还没滚过去的）
  const TOP = 100 // 略大于 navbar 高度，避免标题被遮挡时才算"已过"
  let current: string | null = null
  headings.forEach((h) => {
    if (h.getBoundingClientRect().top <= TOP) current = h.id
  })
  activeId.value = current ?? headings[0].id
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateActive)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateActive()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <aside class="hidden lg:block w-44 shrink-0">
    <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4">
      <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">本文目录</p>
      <p v-if="headings.length === 0" class="text-xs text-gray-400 dark:text-gray-500">暂无标题</p>
      <ul v-else class="space-y-0">
        <li v-for="h2 in headings" :key="h2.id">
          <a
            :href="`#${h2.id}`"
            :class="[
              'block text-sm py-1.5 px-2 rounded transition-colors',
              activeId === h2.id
                ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400',
            ]"
          >
            {{ h2.text }}
          </a>
          <ul v-if="h2.children.length > 0">
            <li v-for="h3 in h2.children" :key="h3.id">
              <a
                :href="`#${h3.id}`"
                :class="[
                  'block text-xs py-1.5 pl-4 rounded transition-colors',
                  activeId === h3.id
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400',
                ]"
              >
                {{ h3.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

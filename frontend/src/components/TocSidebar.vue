<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

interface TocItem {
  level: number
  text: string
  id: string
  children: TocItem[]
}

const props = defineProps<{ headings: TocItem[] }>()
const activeId = ref<string | null>(null)

let observer: IntersectionObserver | null = null

function observeHeadings() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) activeId.value = visible[0].target.id
    },
    { rootMargin: '-80px 0px -70% 0px' },
  )
  document.querySelectorAll('.post-content h2[id], .post-content h3[id]').forEach((h) => observer!.observe(h))
}

onMounted(() => {
  nextTick(() => observeHeadings())
})

// 当 headings 变化时（内容加载完成后），重新观察 DOM 元素
watch(() => props.headings, () => {
  nextTick(() => observeHeadings())
})

onUnmounted(() => observer?.disconnect())
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

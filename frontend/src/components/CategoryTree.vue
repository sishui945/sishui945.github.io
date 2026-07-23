<script setup lang="ts">
import { ref } from 'vue'
import type { CategoryNode } from '@/stores/tutorials'

defineProps<{
  node: CategoryNode
  currentTutorialSlug?: string
  depth?: number
}>()

const expanded = ref(true)
</script>

<template>
  <div :style="{ paddingLeft: (depth ?? 0) > 0 ? '12px' : '0' }">
    <button
      v-if="node.children?.length > 0"
      class="flex items-center gap-1 w-full text-left text-xs font-semibold text-gray-500 dark:text-gray-400 py-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      @click="expanded = !expanded"
    >
      <span class="text-[10px] transition-transform" :class="{ 'rotate-90': expanded }">▶</span>
      {{ node.name }}
    </button>
    <div v-else class="text-xs font-semibold text-gray-500 dark:text-gray-400 py-1">
      {{ node.name }}
    </div>

    <ul v-if="node.children?.length > 0" :class="{ hidden: !expanded }">
      <li v-for="child in node.children" :key="child.id">
        <CategoryTree :node="child" :current-tutorial-slug="currentTutorialSlug" :depth="(depth ?? 0) + 1" />
      </li>
    </ul>

    <ul class="space-y-0.5" :class="{ 'mt-1': node.children?.length }">
      <li v-for="t in node.tutorials" :key="t.id">
        <RouterLink
          :to="`/tutorials/${t.slug}`"
          :class="[
            'block text-xs py-1 px-2 rounded transition-colors truncate',
            t.slug === currentTutorialSlug
              ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
              : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400',
          ]"
        >
          {{ t.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

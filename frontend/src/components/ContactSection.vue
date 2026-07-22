<script setup lang="ts">
interface Contact {
  emoji: string
  label: string
  handle: string
  url: string
  external?: boolean
}

const contacts: Contact[] = [
  { emoji: '📧', label: '邮箱', handle: '3693657762@qq.com', url: 'mailto:3693657762@qq.com' },
  { emoji: '🐙', label: 'GitHub', handle: '@sishui945', url: 'https://github.com/sishui945', external: true },
  { emoji: '📺', label: 'B站', handle: '似水Sishui', url: 'https://space.bilibili.com/1909585735', external: true },
]
</script>

<template>
  <section id="contact" class="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
        联系我
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
        欢迎通过以下方式找到我
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.url"
          :target="contact.external ? '_blank' : undefined"
          :rel="contact.external ? 'noopener noreferrer' : undefined"
          class="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <span class="text-xl">{{ contact.emoji }}</span>
          <div class="text-left">
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ contact.label }}</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ contact.handle }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Interest {
  emoji: string
  label: string
}

const interests: Interest[] = [
  { emoji: '💻', label: 'C/C++' },
  { emoji: '🎨', label: 'Blender' },
  { emoji: '📐', label: '数学物理' },
  { emoji: '🎮', label: '游戏开发' },
  { emoji: '📖', label: '哲学' },
  { emoji: '🌐', label: '全栈开发' },
]
</script>

<template>
  <section id="hero" class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
    <!-- 装饰光斑 -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
    </div>

    <!-- 星点 -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="star star-1" />
      <div class="star star-2" />
      <div class="star star-3" />
      <div class="star star-4" />
      <div class="star star-5" />
    </div>

    <div class="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
      <!-- 头像 -->
      <div class="animate-fade-in" style="animation-delay: 0s">
        <img
          src="/hero.png"
          alt="似水Sishui 头像"
          class="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-indigo-200 dark:ring-indigo-800 shadow-lg mb-6"
        />
      </div>

      <!-- 标题 -->
      <h1 class="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-4" style="animation-delay: 0.1s">
        似水Sishui
      </h1>

      <!-- 简介 -->
      <p class="animate-fade-in text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed mb-6" style="animation-delay: 0.2s">
        浙江理工大学 · 机器人工程专业 · 大一<br />
        在代码、物理与画笔之间探索世界。
      </p>

      <!-- 兴趣徽章 -->
      <div class="animate-fade-in flex flex-wrap justify-center gap-3 mb-8" style="animation-delay: 0.3s">
        <span
          v-for="item in interests"
          :key="item.label"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50"
        >
          <span>{{ item.emoji }}</span>
          <span>{{ item.label }}</span>
        </span>
      </div>

      <!-- CTA -->
      <div class="animate-fade-in" style="animation-delay: 0.4s">
        <a
          href="/#projects"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          查看项目
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.star {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #6366f1;
  animation: twinkle 3s ease-in-out infinite;
}
.dark .star {
  background: #a5b4fc;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}
.star-1 { top: 15%; left: 10%; animation-delay: 0s; }
.star-2 { top: 25%; right: 15%; animation-delay: 0.8s; width: 2px; height: 2px; }
.star-3 { top: 60%; left: 20%; animation-delay: 1.6s; }
.star-4 { bottom: 25%; right: 10%; animation-delay: 2.2s; width: 2px; height: 2px; }
.star-5 { top: 40%; left: 60%; animation-delay: 1.0s; width: 4px; height: 4px; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
</style>

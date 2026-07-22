<script setup lang="ts">
interface TagItem {
  name: string
  level: number
}

const tags: TagItem[] = [
  { name: 'C/C++', level: 90 },
  { name: 'Java', level: 80 },
  { name: 'Python', level: 60 },
  { name: 'TypeScript', level: 50 },
  { name: 'Vue', level: 40 },
  { name: 'React', level: 20 },
  { name: 'Tailwind CSS', level: 80 },
  { name: 'Blender', level: 50 },
  { name: 'Figma', level: 30 },
  { name: 'Linux', level: 50 },
  { name: 'Git', level: 70 },
  { name: 'STM32', level: 30 },
  { name: 'Prisma', level: 30 },
  { name: 'NestJS', level: 30 },
  { name: 'PostgreSQL', level: 20 },
  { name: 'Vercel', level: 40 },
]

function tagSize(level: number): string {
  if (level >= 80) return 'text-base font-semibold'
  if (level >= 60) return 'text-sm font-medium'
  if (level >= 40) return 'text-xs'
  return 'text-[10px]'
}
</script>

<template>
  <section id="about" class="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-12 text-center">
        关于我
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- 左侧：文字 -->
        <div class="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-display">我是谁</h3>
            <p>
              浙江理工大学机器人工程专业大一学生。
              写 C/C++ 和 Java，做 Blender 建模，读哲学和物理。
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-display">我在做什么</h3>
            <p>
              用这个网站作为练手项目——从 Vite + Tailwind CSS 搭骨架，到暗色模式和响应式，每一个模块都在边学边做中完善。
              同时在读 Effective Modern C++ 和 CSAPP。
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-display">我的方向</h3>
            <p>
              短期让网站上线并持续记录学习。中期深入全栈开发和 C++ 项目。
              长期想做 OS、编译器、AI 模型、独立游戏。
            </p>
          </div>
        </div>

        <!-- 右侧：标签云 -->
        <div class="flex flex-wrap gap-2.5 justify-center lg:justify-start">
          <span
            v-for="tag in tags"
            :key="tag.name"
            class="inline-block px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default"
            :class="tagSize(tag.level)"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

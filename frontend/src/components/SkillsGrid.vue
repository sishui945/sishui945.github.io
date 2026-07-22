<script setup lang="ts">
interface Skill {
  name: string
  desc: string
  level: 'comfortable' | 'learning' | 'exploring'
}

interface Category {
  category: string
  icon: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    category: '语言',
    icon: '📝',
    skills: [
      { name: 'C/C++', desc: '指针、内存管理、STL 容器', level: 'comfortable' },
      { name: 'Java', desc: '面向对象、集合框架', level: 'comfortable' },
      { name: 'TypeScript', desc: '类型系统、泛型', level: 'learning' },
      { name: 'Python', desc: 'NumPy、数据处理', level: 'exploring' },
    ],
  },
  {
    category: '前端',
    icon: '🎯',
    skills: [
      { name: 'Vue 3', desc: 'Composition API、Pinia', level: 'learning' },
      { name: 'Tailwind CSS', desc: '响应式、暗色模式', level: 'comfortable' },
      { name: 'Vite', desc: '构建工具、多页配置', level: 'comfortable' },
    ],
  },
  {
    category: '工具',
    icon: '🛠️',
    skills: [
      { name: 'Git', desc: '分支管理、Worktree', level: 'comfortable' },
      { name: 'Linux', desc: '命令行、Shell 脚本', level: 'learning' },
      { name: 'Blender', desc: '建模、材质、灯光', level: 'learning' },
    ],
  },
  {
    category: '创意',
    icon: '✨',
    skills: [
      { name: 'Figma', desc: 'UI 设计、原型', level: 'exploring' },
      { name: 'Premiere Pro', desc: '视频剪辑', level: 'exploring' },
    ],
  },
]

interface LevelConfig {
  label: string
  class: string
}

const levelMap: Record<Skill['level'], LevelConfig> = {
  comfortable: { label: '熟练', class: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' },
  learning: { label: '学习中', class: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' },
  exploring: { label: '初探', class: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' },
}
</script>

<template>
  <section id="skills" class="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-12 text-center">
        技能
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="category in categories"
          :key="category.category"
          class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
        >
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 font-display">
            <span>{{ category.icon }}</span>
            <span>{{ category.category }}</span>
          </h3>

          <ul class="space-y-3">
            <li
              v-for="skill in category.skills"
              :key="skill.name"
              class="flex flex-col gap-0.5"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ skill.name }}</span>
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
                  :class="levelMap[skill.level].class"
                >
                  {{ levelMap[skill.level].label }}
                </span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ skill.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

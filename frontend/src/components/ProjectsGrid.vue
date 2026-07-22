<script setup lang="ts">
interface ProjectLink {
  label: string
  url: string
}

interface Project {
  title: string
  desc: string
  tags: string[]
  status: 'building' | 'done' | 'experiment'
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    title: '个人网站',
    desc: 'Vite + Tailwind CSS + Vue 3 全栈个人网站，含博客系统、暗色模式、响应式布局',
    tags: ['Vue', 'Tailwind', 'NestJS'],
    status: 'building',
    links: [{ label: 'GitHub', url: 'https://github.com/sishui945/my-portfolio' }],
  },
  {
    title: 'BMP 解析器',
    desc: 'C++ BMP 图片解析器，支持读取文件头、信息头、像素数据，输出 PPM 格式',
    tags: ['C++', 'CMake'],
    status: 'experiment',
    links: [],
  },
  {
    title: 'Blender 建模',
    desc: 'Blender 3D 建模作品，含材质渲染和灯光设置',
    tags: ['Blender', '3D'],
    status: 'done',
    links: [{ label: 'B站', url: 'https://space.bilibili.com/1909585735' }],
  },
]

interface StatusConfig {
  label: string
  class: string
}

const statusMap: Record<Project['status'], StatusConfig> = {
  building: { label: '进行中', class: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50' },
  done: { label: '已完成', class: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50' },
  experiment: { label: '实验性', class: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50' },
}
</script>

<template>
  <section id="projects" class="py-20 px-6 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-12 text-center">
        项目
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in projects"
          :key="project.title"
          class="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 flex flex-col"
        >
          <!-- 状态角标 -->
          <span
            class="self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3"
            :class="statusMap[project.status].class"
          >
            {{ statusMap[project.status].label }}
          </span>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-display">
            {{ project.title }}
          </h3>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
            {{ project.desc }}
          </p>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 链接 -->
          <div v-if="project.links.length" class="flex gap-3 mt-auto">
            <a
              v-for="link in project.links"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {{ link.label }}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

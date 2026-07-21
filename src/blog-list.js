// 博客列表页 JS 入口
import './style.css'
import './theme-button.js'
import { blogPosts } from './data/blog-posts.js'
import { initTheme } from './theme.js'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blog-list')
  if (!container) return

  // 按日期倒序排列
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

  container.innerHTML = sorted.map(post => `
    <article class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <h2 class="text-lg font-bold mb-2 dark:text-white">
        <a href="/blog/post.html?id=${post.id}"
           class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          ${post.title}
        </a>
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">${post.excerpt}</p>
      <div class="flex flex-wrap gap-1.5">
        ${post.tags.map(tag => `
          <span class="px-2 py-0.5 text-xs rounded-full
                       bg-indigo-50 dark:bg-indigo-900/20
                       text-indigo-600 dark:text-indigo-400
                       border border-indigo-100 dark:border-indigo-800">
            ${tag}
          </span>
        `).join('')}
      </div>
    </article>
  `).join('')

  initTheme()
})

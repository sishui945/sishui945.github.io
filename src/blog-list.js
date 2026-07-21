// 博客列表页 JS 入口
import './style.css'
import './theme-button.js'
import { blogPosts } from './data/blog-posts.js'
import { initTheme } from './theme.js'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blog-list')
  if (!container) return

  // 提取所有不重复标签
  const allTags = [...new Set(blogPosts.flatMap(p => p.tags))].sort()

  let activeTag = null

  // 在容器前插入标签筛选栏
  const tagBar = document.createElement('div')
  tagBar.className = 'flex flex-wrap items-center gap-2 mb-8'
  container.parentElement.insertBefore(tagBar, container)

  // ========== 渲染标签按钮 ==========
  function renderTagBar() {
    tagBar.innerHTML = `
      <button data-tag=""
              class="px-4 py-1.5 text-sm rounded-full border transition-colors duration-200
                     ${activeTag === null
                       ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500'
                       : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}">
        全部
      </button>
      ${allTags.map(tag => `
        <button data-tag="${tag}"
                class="px-4 py-1.5 text-sm rounded-full border transition-colors duration-200
                       ${activeTag === tag
                         ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500'
                         : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}">
          ${tag}
        </button>
      `).join('')}
    `
  }

  // ========== 渲染文章卡片 ==========
  function renderCards() {
    const filtered = activeTag
      ? blogPosts.filter(p => p.tags.includes(activeTag))
      : blogPosts

    const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

    if (sorted.length === 0) {
      container.innerHTML = `
        <div class="md:col-span-2 text-center py-12 text-gray-400 dark:text-gray-500">
          没有匹配的文章
        </div>
      `
      return
    }

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
  }

  // ========== 标签点击 ==========
  tagBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if (!btn) return
    activeTag = btn.dataset.tag || null   // 空字符串 → null（全部）
    renderTagBar()
    renderCards()
  })

  // ========== 初始化 ==========
  renderTagBar()
  renderCards()
  initTheme()
})

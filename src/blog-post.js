// 博客详情页 JS 入口
import './style.css'
import './theme-button.js'
import { blogPosts } from './data/blog-posts.js'
import { initTheme } from './theme.js'
import { marked } from 'marked'

// 配置 marked：在新标签页打开外部链接
marked.use({
  renderer: {
    link({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`
    },
  },
})

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('post-content')
  if (!container) return

  // 读取 URL 参数
  const params = new URLSearchParams(window.location.search)
  const id = parseInt(params.get('id'), 10)

  if (!id) {
    show404(container)
    initTheme()
    return
  }

  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    show404(container)
    initTheme()
    return
  }

  // 更新页面标题
  document.title = `${post.title} | 似水Sishui`

  // 渲染文章
  const html = marked.parse(post.content)

  container.innerHTML = `
    <header class="mb-10">
      <h1 class="font-display text-3xl md:text-4xl font-bold dark:text-white mb-4 leading-tight">${post.title}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <div class="flex flex-wrap gap-2">
        ${post.tags.map(tag => `
          <span class="px-3 py-1 text-xs rounded-full
                       bg-indigo-50 dark:bg-indigo-900/20
                       text-indigo-600 dark:text-indigo-400
                       border border-indigo-100 dark:border-indigo-800">
            ${tag}
          </span>
        `).join('')}
      </div>
    </header>

    <div class="post-content">
      ${html}
    </div>
  `

  initTheme()
})

function show404(container) {
  document.title = '文章未找到 | 似水Sishui'
  container.innerHTML = `
    <div class="text-center py-20">
      <p class="text-6xl mb-4">📄</p>
      <h1 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">文章未找到</h1>
      <p class="text-gray-500 dark:text-gray-400">请检查 URL 中的文章 ID 是否正确</p>
      <a href="/blog/"
         class="inline-block mt-6 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium
                hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
        返回全部文章
      </a>
    </div>
  `
}

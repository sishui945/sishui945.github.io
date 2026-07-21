// 博客详情页 JS 入口
import './style.css'
import './theme-button.js'
import { blogPosts } from './data/blog-posts.js'
import { initTheme } from './theme.js'
import { marked } from 'marked'

// ========== 工具函数 ==========

/** 标题文本 → URL 安全的 id */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** 从 markdown 提取 h2/h3，转为树形结构 */
function extractTocTree(md) {
  const re = /^(#{2,3})\s+(.+)$/gm
  const headings = []
  let m
  while ((m = re.exec(md)) !== null) {
    headings.push({
      level: m[1].length,
      text: m[2].trim(),
      id: slugify(m[2].trim()),
    })
  }

  // 扁平 → 树：h3 归属到它前面的 h2 下
  const tree = []
  let currentH2 = null
  for (const h of headings) {
    if (h.level === 2) {
      currentH2 = { ...h, children: [] }
      tree.push(currentH2)
    } else if (h.level === 3 && currentH2) {
      currentH2.children.push(h)
    }
  }
  return tree
}

// ========== 配置 marked ==========

marked.use({
  renderer: {
    heading({ text, depth }) {
      const id = slugify(text)
      return `<h${depth} id="${id}">${text}</h${depth}>`
    },
    link({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`
    },
  },
})

// ========== 主流程 ==========

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('post-content')
  if (!container) return

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

  document.title = `${post.title} | 似水Sishui`

  // 解析目录树 + 渲染 Markdown
  const tocTree = extractTocTree(post.content)
  const html = marked.parse(post.content)

  // 渲染正文
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

  // 渲染左右侧栏
  renderArticleList(post)
  renderToc(tocTree)

  // 目录滚动监听
  setupScrollSpy()

  initTheme()
})

// ========== 左栏：文章列表 ==========

function renderArticleList(currentPost) {
  const sidebar = document.getElementById('post-sidebar-left')
  if (!sidebar) return
  const sticky = sidebar.querySelector('.sticky')
  if (!sticky) return

  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

  sticky.innerHTML = `
    <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">文章列表</p>
    <ul class="space-y-0.5">
      ${sorted.map(p => `
        <li>
          <a href="/blog/post.html?id=${p.id}"
             class="block text-sm py-1.5 px-2 rounded-lg transition-colors truncate
                    ${p.id === currentPost.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}">
            ${p.title}
          </a>
        </li>
      `).join('')}
    </ul>
  `
}

// ========== 右栏：树形目录 ==========

function renderToc(tree) {
  const sidebar = document.getElementById('post-sidebar-right')
  if (!sidebar) return
  const sticky = sidebar.querySelector('.sticky')
  if (!sticky) return

  if (tree.length === 0) {
    sticky.innerHTML = `
      <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">本文目录</p>
      <p class="text-xs text-gray-400 dark:text-gray-500">暂无标题</p>
    `
    return
  }

  sticky.innerHTML = `
    <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">本文目录</p>
    <ul id="toc-list" class="space-y-0">
      ${tree.map(h2 => `
        <li>
          <a href="#${h2.id}" data-toc="${h2.id}"
             class="block text-sm py-1.5 px-2 rounded transition-colors
                    text-gray-600 dark:text-gray-300 font-medium
                    hover:text-indigo-600 dark:hover:text-indigo-400">
            ${h2.text}
          </a>
          ${h2.children.length > 0 ? `
            <ul class="ml-2.5 border-l-2 border-gray-200 dark:border-gray-700">
              ${h2.children.map(h3 => `
                <li>
                  <a href="#${h3.id}" data-toc="${h3.id}"
                     class="block text-xs py-1.5 pl-3 rounded transition-colors
                            text-gray-400 dark:text-gray-500
                            hover:text-indigo-600 dark:hover:text-indigo-400">
                    ${h3.text}
                  </a>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </li>
      `).join('')}
    </ul>
  `
}

// ========== 滚动监听：高亮当前目录项 ==========

function setupScrollSpy() {
  const tocList = document.getElementById('toc-list')
  if (!tocList) return

  const links = tocList.querySelectorAll('a[data-toc]')
  if (links.length === 0) return

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

    if (visible.length > 0) {
      const activeId = visible[0].target.id
      links.forEach(link => {
        const isActive = link.dataset.toc === activeId
        link.classList.toggle('text-indigo-600', isActive)
        link.classList.toggle('dark:text-indigo-400', isActive)
        link.classList.toggle('text-gray-600', !isActive && link.parentElement.parentElement === tocList)
        link.classList.toggle('dark:text-gray-300', !isActive && link.parentElement.parentElement === tocList)
        link.classList.toggle('text-gray-400', !isActive && link.parentElement.parentElement !== tocList)
        link.classList.toggle('dark:text-gray-500', !isActive && link.parentElement.parentElement !== tocList)
      })
    }
  }, { rootMargin: '-80px 0px -70% 0px' })

  document.querySelectorAll('.post-content h2[id], .post-content h3[id]').forEach(h => {
    observer.observe(h)
  })
}

// ========== 404 ==========

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

  // 清空侧栏
  ;['post-sidebar-left', 'post-sidebar-right'].forEach(id => {
    const el = document.getElementById(id)
    if (el) {
      const sticky = el.querySelector('.sticky')
      if (sticky) sticky.innerHTML = ''
    }
  })
}

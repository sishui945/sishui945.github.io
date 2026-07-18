// 入口文件 —— 负责初始化所有模块
import './style.css'
import { skillCategories } from './data/skills.js'
import { projects } from './data/projects.js'
import { contacts } from './data/contact.js'
import { aboutTags } from './data/about-tags.js'
import { interests } from './data/interests.js'
import { blogPosts } from './data/blog-posts.js'
import {
  renderSkills, renderProjects, renderContact,
  renderTagCloud, renderInterests, renderBlogPreview,
} from './render.js'
import { initTheme } from './theme.js'

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero — 兴趣徽章
  const interestsRow = document.getElementById('interests-row')
  if (interestsRow) renderInterests(interestsRow, interests)

  // 2. 关于我 — 技能标签云
  const tagCloud = document.getElementById('about-tags')
  if (tagCloud) renderTagCloud(tagCloud, aboutTags)

  // 3. 项目卡片
  const projectsGrid = document.getElementById('projects-grid')
  if (projectsGrid) renderProjects(projectsGrid, projects)

  // 4. 技能卡片（按类别）
  const skillsGrid = document.getElementById('skills-grid')
  if (skillsGrid) renderSkills(skillsGrid, skillCategories)

  // 5. 博客预览
  const blogGrid = document.getElementById('blog-preview-grid')
  if (blogGrid) renderBlogPreview(blogGrid, blogPosts)

  // 7. 联系卡片
  const contactGrid = document.getElementById('contact-grid')
  if (contactGrid) renderContact(contactGrid, contacts)

  // 8. 暗色模式
  initTheme()

  // 9. 导航高亮 & 滚动到顶部按钮
  initScrollEffects()
})

// ========== 滚动效果 ==========

function initScrollEffects() {
  // --- 导航高亮 ---
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('nav a[href^="#"]')

  // section 滚动揭示（排除了 #home，Hero 有自己的动画）
  sections.forEach(s => {
    if (s.id !== 'home') s.classList.add('section-reveal')
  })

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        navLinks.forEach(link => {
          const href = link.getAttribute('href')
          if (href === `#${id}`) {
            link.classList.add('text-blue-600', 'dark:text-blue-400')
            link.classList.remove('text-gray-600', 'dark:text-gray-300')
          } else {
            link.classList.remove('text-blue-600', 'dark:text-blue-400')
            link.classList.add('text-gray-600', 'dark:text-gray-300')
          }
        })
      }
      // 滚动揭示
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })

  sections.forEach(s => navObserver.observe(s))

  // --- 滚动到顶部按钮 ---
  const btn = document.createElement('button')
  btn.innerHTML = '↑'
  btn.className = 'fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 flex items-center justify-center text-lg opacity-0 pointer-events-none'
  btn.setAttribute('aria-label', '滚动到顶部')
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  document.body.appendChild(btn)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none')
      btn.classList.add('opacity-100')
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none')
      btn.classList.remove('opacity-100')
    }
  })
}

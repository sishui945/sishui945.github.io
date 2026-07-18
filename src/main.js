// 入口文件 —— 负责初始化所有模块
// 导入顺序：样式 → 数据 → 渲染 → 主题
import './style.css'
import { skills } from './data/skills.js'
import { contacts } from './data/contact.js'
import { aboutTags } from './data/about-tags.js'
import { renderSkills, renderContact, renderTagCloud, renderProjects } from './render.js'
import { projects } from './data/projects.js'
import { initTheme } from './theme.js'

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 1. 渲染技能卡片
  const skillsGrid = document.getElementById('skills-grid')
  if (skillsGrid) renderSkills(skillsGrid, skills)

  // 2. 渲染技能标签云（关于我区域）
  const tagCloud = document.getElementById('about-tags')
  if (tagCloud) renderTagCloud(tagCloud, aboutTags)

  // 3. 渲染项目卡片
  const projectsGrid = document.getElementById('projects-grid')
  if (projectsGrid) renderProjects(projectsGrid, projects)

  // 4. 渲染联系卡片
  const contactGrid = document.getElementById('contact-grid')
  if (contactGrid) renderContact(contactGrid, contacts)

  // 3. 初始化暗色模式
  initTheme()
})

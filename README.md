# 似水Sishui 的个人网站

Vue 3 + NestJS + PostgreSQL 全栈个人网站，包含博客、教程系统和项目展示。

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Vue 3 + TypeScript + Pinia + Vue Router + Tailwind CSS 3 |
| 后端 | NestJS 11 + Prisma 7 + PostgreSQL |
| 包管理 | pnpm |
| 部署 | Vercel（前端）+ Railway（后端） |

## 功能

- **主页**：Hero / 关于我 / 项目 / 博客预览 / 联系
- **博客**：Markdown 渲染 + 标签筛选 + 三列布局 + TOC 目录 + 阅读进度条
- **教程**：分类 → 教程 → 章节三级结构 + 三栏阅读页 + 翻页导航
- **暗色模式**：动画切换按钮 + 系统偏好跟随
- **响应式**：移动优先

## 本地运行

```bash
# 1. 安装依赖
cd frontend && pnpm install
cd ../backend && pnpm install

# 2. 配置数据库
# 在 backend/.env 中设置 DATABASE_URL

# 3. 初始化数据
cd backend && npx tsx prisma/migrate dev
cd backend && npx tsx prisma/seed.ts

# 4. 启动
# 终端1：后端
双击 start-backend.bat
# 终端2：前端
双击 start-frontend.bat
```

## 添加内容

- **博客文章**：在 `blog/posts/<分类>/` 下写 `.md`，在 `seed.ts` 加 upsert，跑 seed
- **教程**：在 `tutorials/<分类>/<教程>/` 下写 `.md`，跑 seed 自动同步

## 作者

似水Sishui — 浙江理工大学 2025 级 机器人工程专业

---

*边学边做，持续迭代。*

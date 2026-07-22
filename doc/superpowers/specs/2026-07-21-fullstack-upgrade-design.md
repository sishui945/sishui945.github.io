# 全栈升级设计规格

> **日期**：2026-07-21  
> **状态**：已批准  
> **范围**：后端（NestJS + Prisma）+ 前端（Vue 3 + TS）+ 部署（Vercel + Railway）

## 一、目标

将个人网站从纯 HTML + 原生 JS（Vite 多页构建）升级为 Vue 3 + NestJS 全栈架构。内容直接迁移，不重写。

## 二、实施顺序

**先后端再前端**：API 和数据层先落地，前端从写死数据直接切换到真实接口，避免"先 mock 再替换"的返工。

```
后端（Day 1-2）→ 前端（Day 3-4）→ 联调部署（Day 5）
```

## 三、后端设计

### 技术栈

- **框架**：NestJS + TypeScript
- **ORM**：Prisma
- **数据库**：PostgreSQL（Railway 托管）
- **文档**：Swagger（`/api`）
- **校验**：class-validator

### 项目结构

```
backend/
  prisma/
    schema.prisma
    seed.ts
  src/
    prisma/
      prisma.module.ts        # @Global() 模块
      prisma.service.ts
    posts/
      posts.module.ts
      posts.controller.ts
      posts.service.ts
      dto/
        create-post.dto.ts
        query-posts.dto.ts
    projects/
      projects.module.ts
      projects.controller.ts
      projects.service.ts
    tags/
      tags.module.ts
      tags.controller.ts
      tags.service.ts
    main.ts                   # CORS + Swagger + ValidationPipe
```

### 数据模型（5 表）

```prisma
model Post {
  id          Int        @id @default(autoincrement())
  title       String
  slug        String     @unique
  content     String     // Markdown 原文
  excerpt     String?
  publishedAt DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  tags        PostTag[]
}

model Tag {
  id    Int       @id @default(autoincrement())
  name  String    @unique
  posts PostTag[]
}

model PostTag {
  postId Int
  tagId  Int
  post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
  @@id([postId, tagId])
}

model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  links       Json?    // [{label, url}]
  status      String   // "building" | "done" | "experiment"
  createdAt   DateTime @default(now())
}

// 注意：Project 暂不与 Tag 关联，tags 保留在 links 或 JS 元数据中。
// 未来可参考 PostTag 模式添加 ProjectTag。
```

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/posts` | 文章列表，不含 `content` 字段 |
| GET | `/posts/:slug` | 单篇全文，含 `content` |
| GET | `/tags` | 所有标签 + `_count.posts` |
| GET | `/projects` | 项目列表 |

Swagger 文档挂载在 `/api`。

### 数据迁移

`prisma/seed.ts`：从现有 JS 数据文件读取 3 篇文章和 4 个项目，通过 Prisma create 写入数据库。

## 四、前端设计

### 技术栈

- **框架**：Vue 3 + TypeScript + `<script setup>`
- **构建**：Vite（`frontend/` 独立目录）
- **路由**：Vue Router 4（history 模式）
- **状态**：Pinia（themeStore + postsStore）
- **样式**：Tailwind CSS 3 + shadcn-vue 组件
- **Markdown**：marked（直接 import，不需要 composable 包装）
- **HTTP**：Axios

### 项目结构

```
frontend/
  public/
    favicon.svg
    hero.png
    logo.png
  src/
    api/
      client.ts              # Axios 实例，baseURL = import.meta.env.VITE_API_URL
    stores/
      theme.ts               # Pinia: isDark, toggle(), localStorage 持久化
      posts.ts               # Pinia: list[], current, tags[], loading, error, fetchList(), fetchBySlug()
    router/
      index.ts               # 5 路由 + scrollBehavior
    views/
      HomeView.vue           # 单页滚动，6 section
      BlogListView.vue       # 文章列表 + TagFilter
      BlogDetailView.vue     # 三列布局
      NotFoundView.vue       # 404
    components/
      Navbar.vue             # sticky nav + ThemeToggle + shadcn Sheet（移动端）
      ThemeToggle.vue        # 太阳/月亮动画（从 Web Component 迁移）
      HeroSection.vue
      AboutSection.vue
      ProjectsGrid.vue       # 首页仅 3 精选
      ProjectCard.vue
      SkillsGrid.vue
      SkillCard.vue
      BlogPreview.vue        # 首页最新 2 篇
      BlogCard.vue
      ContactSection.vue
      Footer.vue
      TagFilter.vue          # 标签筛选按钮组
      PostSidebar.vue        # 文章列表侧栏
      TocSidebar.vue         # 树形目录（Typora 纯缩进风格）
      LoadingSkeleton.vue    # 骨架屏
    App.vue
    main.ts
    style.css                # Tailwind 指令 + 全局动画
  vercel.json                # SPA fallback
```

### 路由表

```
/                     → HomeView
/blog                 → BlogListView
/blog/:slug           → BlogDetailView
/:pathMatch(.*)*      → NotFoundView
```

路由使用 history 模式，`scrollBehavior` 配置导航后滚到顶部。

### BlogDetailView 布局

**桌面端（≥lg）**：三列 flex
- 左栏 `PostSidebar`：w-52，sticky，文章列表
- 中栏：flex-1 max-w-3xl，正文
- 右栏 `TocSidebar`：w-48，sticky，树形目录 + scroll spy

**移动端（<lg）**：
- 左右侧栏隐藏，正文全宽
- TocSidebar 变为右下角浮动按钮（FAB），点击展开 Sheet 抽屉显示目录

### 关键迁移映射

| 原生 | Vue 3 |
|------|-------|
| `theme-button.js` Web Component | `ThemeToggle.vue`（保留动画 CSS，用 Vue 模板重写） |
| `theme.js` localStorage | `stores/theme.ts` Pinia |
| `main.js` DOMContentLoaded | `<script setup>` 组件自动初始化 |
| `render.js` innerHTML | Vue 模板 + `v-for` |
| `blog-post.js` `URLSearchParams` | `useRoute().params.slug` |
| `blog-list.js` 独立入口 | BlogListView 路由组件 |
| 页面级 JS 入口分散 | 统一 `main.ts` + Router 分发 |

### CSS 拆分策略

| 当前 | 迁移目标 |
|------|----------|
| `style.css` Tailwind 指令 | `frontend/src/style.css` |
| 文章排版 `.post-content` | `PostContent.vue` `<style scoped>` |
| 侧栏滚动条 `.sidebar-scroll` | `TocSidebar.vue` + `PostSidebar.vue` `<style scoped>` |
| Hero 动画 `.animate-fade-in` | `HeroSection.vue` `<style scoped>` |
| section 揭示动画 | 组件级 `<style scoped>` |

### ThemeToggle 迁移

当前 Web Component 的 220 行动画 CSS（`.components` / `.main-button` / `.moon` / `.stars` / `.cloud` 等）迁移到 `ThemeToggle.vue` 的 `<style scoped>`。交互逻辑用 Vue `ref` 替代 `components.onclick()`。

### 新增组件

**LoadingSkeleton.vue**：博客列表/详情加载时显示骨架屏（灰色占位块 + 脉冲动画），比空白页面体验好。

**NotFoundView.vue**：404 页面，居中显示"页面未找到" + 返回首页链接。

## 五、部署

| 层 | 平台 | 配置 |
|----|------|------|
| 前端 | Vercel | `vercel.json` 配置 SPA fallback（`"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]`） |
| 后端 | Railway | 自动识别 NestJS，环境变量 `DATABASE_URL` |
| 数据库 | Railway PostgreSQL | 同上 |

前端环境变量 `VITE_API_URL` 指向后端 Railway 域名。

## 六、不在范围

- 用户认证 / JWT / Admin 后台（阶段三或开学后）
- 留言板、邮件订阅、音乐播放器
- 项目独立页面 `/projects`（未来项目超过 6 个时再加）
- 测试（个人项目 MVP 阶段不写测试）
- CI/CD（手动部署即可）

## 七、风险

| 风险 | 缓解 |
|------|------|
| shadcn-vue 组件 API 不稳定 | 仅用 Button/Card/Badge/Sheet/Skeleton，这些是稳定的核心组件 |
| 原生站迁移时有数据丢失 | Commit 原生站到 git，Vue 工程放独立目录，随时可回滚 |
| Railway 免费额度限制 | 当前数据量极小，足够用 |
| 4 天时间紧张 | Day 4=缓冲，未完成标注"开学继续" |

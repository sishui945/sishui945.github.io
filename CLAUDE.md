# 个人网站（my-portfolio）

## 关于作者

- **似水Sishui（sishui945）**，浙江理工大学 2025 级，**机器人工程专业**（不是信息工程）
- 大一在读，2026 暑假后升大二
- C 程序设计 92（最强项）、线代 90、高数 A1 87 → A2 82
- 弱项：电路原理 71（模电前置不牢）、英语持续下滑 78→68（六级预警）、马原 62 擦线、体育缺两学期需补修

### 九大目标（优先级排序）

| # | 目标 | 启动时间 | 主线期 |
|---|------|----------|--------|
| 1 | **个人网站**（数字名片+博客+项目集） | 大一暑假 | 大二上 V1 上线，持续迭代 |
| 2 | **考研上岸** | 大三上 | 大三下~大四上 |
| 3 | **C++格式转换器**（图片/音频/视频/模型） | 大二暑假 | 大二暑假~大三上 |
| 4 | **AI陪伴模型**（Python/PyTorch） | 大三上 | 大三~大四 |
| 5 | **B站百万播放动画**（Blender + 哲学可视化） | 大三上 | 大三~大四碎片积累 |
| 6 | **弦论研究**（Goldstein → Griffiths → Peskin） | 大一暑假 | 大二~大三周末 |
| 7 | **Steam 3D游戏**（UE5，定价 24r） | 大四上 | 大四+毕业后 |
| 8 | **OS & 编译器**（xv6 → MiniLang → 自举） | 大二暑假 | 大二~大四长期 |
| 9 | **mcmod**（Fabric/Forge） | 假期 | 假期项目 |

### 八条发展线

1. **CS**：C → C++ → 数据结构/算法 → OS → 编译器 → AI系统。终极目标：OS 能跑自己写的编译器，编译器能编译自己的内核
2. **电子信息**：电路 → 模电/数电 → STM32 → PCB设计 → 射频/无线 → 自平衡机器人
3. **哲学**：24 个月系统规划（古希腊 → 德国观念论 → 分析哲学 → 大陆哲学 → 专题论文），使用 Obsidian + Zotero
4. **文学**：主动阅读 + 晨读习惯 + 建立文学联系
5. **画画**：素描/透视/构图（6月） → 人体/色彩/光影（12月） → 风格形成
6. **建模与动画**：Blender 基础 → 硬表面/有机建模 → 动画/物理模拟 → 几何节点/TVC
7. **游戏开发**：UE5 + C++，4 阶段到 Steam 发布。5 维能力雷达：程序×美术×设计×音频×运营
8. **Node.js + NestJS 全栈**：2 周可从零到部署带登录的 API（对标 Spring Boot）

### 学习风格

- **边学边做**：项目驱动，不假设已掌握任何技术点
- **MECE + PDCA**：每学期目标 3-4 个，不重叠；每学期末诚实回顾
- **A/B/C 三档降级**：卡住 2 周自动降档，降级比放弃好
- **防崩机制**：GPA 预警暂停课外项目、连续 3 天不想做→休息 2 天回到 C 档

### 当前阶段（大一暑假 55 天计划 · 全栈修订版）

详见 `doc/2026暑假计划_全栈修订版.md`。四个阶段 + 缓冲期：

| 阶段 | 日期 | 主线 | 辅线 |
|------|------|------|------|
| 一 | 7/16–7/25 | **个人网站**（✅ Day 1–6 原生 → Day 7–10 Vue3+NestJS 全栈已完成） | C++ |
| 二 | 7/26–8/7 | CSAPP + BMP 解析器 | 离散数学 + 六级 |
| 三 | 8/8–8/22 | 弦论（Goldstein） | 概率统计 + 网站迭代 |
| 四 | 8/23–8/30 | 数学收尾 + mcmod | 日语语法 |
| 缓冲 | 8/31–9/8 | 下学期预习 + 补漏 | 归档 |

**全栈技术栈（阶段一产出）**：Vue 3 + TS + Pinia + Vue Router + Tailwind + shadcn-vue（前端） / NestJS + Prisma + PostgreSQL + Swagger（后端） / Vercel + Railway（部署）

**AI 协作原则**：AI 写 80% 代码，你负责设计、审查、调试、填内容。学习重点从"记语法"转向"读代码 + 架构思维 + Prompt 工程"。

### 下学期（大二上 2026.9）重点

- 课程：工程力学、模电、数电、普物 A2、复变函数与积分变换 B、概率论与数理统计 B、科学计算与数据分析
- ⚠️ 电路原理 71 → 模电前置不牢；英语 68 且下滑 → CET-6 紧迫
- 网站上线 + 周更博客

## 项目概述

- **定位**：数字名片 + 项目集散中心 + 学习笔记博客
- **原则**：上线比完美重要，边学边做，持续迭代

### 当前功能

- 主页 5 个 section：Hero → 关于我 → 项目 → 博客预览 → 联系
- 博客系统：文章列表页（标签筛选）+ 详情页（marked 渲染 Markdown）+ 三列布局（文章列表 | 正文 | TOC 树形目录）+ 移动端 TOC 浮动按钮+ 阅读进度条
- 教程系统：分类 → 教程 → 章节三级结构 + 三栏阅读页（章节目录 | 正文 + 翻页 | 分类导航树）+ seed 自动同步
- 暗色模式（`darkMode: 'class'` + Pinia store + localStorage 持久化）+ 动画主题切换按钮
- 响应式（移动优先）
- 后端 API：NestJS + Prisma + PostgreSQL + Swagger 文档

### 规划中功能

- 部署到 Vercel + Railway
- Giscus 评论、留言板、邮件订阅
- 音乐播放器（默认关闭）、交互彩蛋
- 项目独立页面 `/projects`（项目数超过 6 个时）

## 技术栈

- **前端**: Vue 3 + TypeScript + Pinia + Vue Router + Tailwind CSS 3 + marked (Vite 构建)
- **后端**: NestJS + Prisma + PostgreSQL + Swagger (tsx 直接运行 TypeScript)
- **包管理器**: pnpm
- **数据库**: PostgreSQL 17 本地 + Railway 云端

## 项目结构

```
start-backend.bat        # 后端启动脚本（npx tsx --watch）
start-frontend.bat       # 前端启动脚本（npx vite）
seed.bat                 # 数据库 seed 脚本
delete-post.bat          # 删除博客文章快捷脚本
blog/
  posts/                 # Markdown 文章源文件，分子目录管理
    cpp/                 #   C++ 相关文章
    css/                 #   CSS 相关文章
tutorials/               # 教程 Markdown 源文件，<分类>/<教程>/ 两级目录
  C-C++/
    cpp/                 #   C++ 教程
backend/
  prisma/
    schema.prisma        # Post, Tag, Project, Category, Tutorial, Chapter
    seed.ts              # 数据填充（loadMd + scanTutorials 自动同步）
  prisma.config.ts       # Prisma v7 配置（datasource + seed 入口）
  delete.ts              # 管理工具：按类型删除记录
    prisma/              # @Global() PrismaModule + PrismaService (PG adapter)
    posts/               # GET /posts?tag=, GET /posts/:slug
    tags/                # GET /tags
    projects/            # GET /projects
    main.ts              # CORS + Swagger + ValidationPipe
  .env                   # DATABASE_URL（不提交 Git）
frontend/
  src/
    api/client.ts        # Axios 实例
    stores/
      theme.ts           # Pinia 暗色模式 store
      posts.ts           # Pinia 博客状态 store
    router/index.ts      # 4 路由（/, /blog, /blog/:slug, 404）
    views/
      HomeView.vue       # 单页滚动 6 section
      BlogListView.vue   # 文章列表 + 标签筛选
      BlogDetailView.vue # 三列布局 + marked 渲染
      NotFoundView.vue   # 404
    components/          # 13 个 Vue 组件
  vercel.json            # SPA fallback
doc/                     # 大学规划文档 + 设计规格 + 实现计划
```

## 开发模式

### 添加新文章

1. 在 `blog/posts/<category>/` 下写 `.md` 文件（不需要 front matter，纯 Markdown）
2. 在 `backend/prisma/seed.ts` 加一条 upsert（先确保对应 Tag 存在，再 upsert Post）
3. 运行 `cd backend && npx tsx prisma/seed.ts`

示例（加一篇 Rust 文章）：

```typescript
// 1. 确保标签存在
await prisma.tag.upsert({ where: { slug: 'rust' }, update: {}, create: { name: 'Rust', slug: 'rust' } })
// 2. upsert 文章
await prisma.post.upsert({
  where: { slug: 'rust-ownership' },
  update: { content: loadMd('rust/rust-ownership.md') },
  create: {
    title: 'Rust 所有权机制',
    slug: 'rust-ownership',
    excerpt: 'Ownership、Borrowing、Lifetime',
    content: loadMd('rust/rust-ownership.md'),
    publishedAt: new Date('2026-08-01'),
    tags: { connect: [{ slug: 'rust' }, { slug: 'study-notes' }] },
  },
})
```

`loadMd()` 是 seed.ts 中的辅助函数，从 `blog/posts/` 读取 .md 文件。`upsert` 的 `update` 必须包含 `content`，否则已存在的记录不会更新内容。

运行 seed：双击 `seed.bat` 或 `cd backend && npx tsx prisma/seed.ts`

### 添加新教程

1. 在 `tutorials/<分类>/<教程>/` 下写 `.md` 文件，命名 `01-xxx.md`, `02-xxx.md`（编号决定章节顺序）
2. 运行 seed（自动扫描 `tutorials/` 目录，同步到数据库，清理 orphan）

教程目录结构示例：
```
tutorials/
  C-C++/                  # 分类 slug
    cpp/                  # 教程 slug
      01-intro.md         # 第一章
      02-pointer.md       # 第二章
```

分类名默认取目录名，可在数据库中手动修改为友好的显示名。

### 删除数据

```bash
cd backend && npx tsx delete.ts <type> <slug>
# type: post | tutorial | project | tag
# 示例: npx tsx delete.ts post cpp-fundation
```

删文章：双击 `delete-post.bat`，输入 slug 回车。

### 添加新 section / 页面

Vue 3 SFC 组件模式：`<script setup lang="ts">` → `<template>` → `<style scoped>`

### 当前 API 端点

| Method | Path | 说明 |
|--------|------|------|
| GET | `/posts` | 文章列表，可选 `?tag=<slug>` 筛选 |
| GET | `/posts/:slug` | 单篇文章（含 content） |
| GET | `/tags` | 所有标签（含 `_count.posts`） |
| GET | `/projects` | 项目列表（前端暂未使用） |
| GET | `/categories` | 分类树（含嵌套教程） |
| GET | `/tutorials` | 教程列表，可选 `?category=<slug>` |
| GET | `/tutorials/:slug` | 教程详情（含章节列表） |
| GET | `/tutorials/:slug/chapters/:chapterSlug` | 章节详情（含 content） |

### 前端数据流

- **博客列表页** `BlogListView`：onMounted 时 `Promise.all([fetchList(), fetchTags()])`，且有缓存逻辑（list/tags 非空时不重复请求），`activeTag` 重置为 null
- **博客详情页** `BlogDetailView`：onMounted 时同时 fetch 当前文章（用于正文）+ fetch 全部列表（用于 PostSidebar），`onUnmounted` 清空 `store.current`
- **首页预览** `BlogPreview`：如果 `list` 为空才 `fetchList()`，取前 2 篇
- **ProjectsGrid**：**硬编码数据**，不调用 `/projects` API — 等项目超过 6 个时再切换到 API
- **posts store**：`fetchTags()` 有 try/catch 降级为空数组；`setActiveTag()` 会触发 `fetchList(tag)`

### 验证命令

```bash
# 前端类型检查
cd frontend && npx vue-tsc --noEmit

# 前端构建
cd frontend && npx vite build

# 后端类型检查+启动
cd backend && npx tsx src/main.ts
```

## 注意事项

- 后端用 `tsx` 运行源码，`nest build` 不用（Prisma v7 ESM/CJS 冲突）
- `backend/.env` 不提交 Git，含数据库密码
- 后端所有依赖注入必须用显式 `@Inject()`（tsx 的 esbuild 不支持 `emitDecoratorMetadata`）
- **`main.ts` import 顺序不能改**：`import 'reflect-metadata'` 必须第一行，`import 'dotenv/config'` 必须第二行，之后才是 `@nestjs/core` 等
- **Prisma v7 要点**：Client 从 `../generated/prisma/client` 导入（不是 `@prisma/client`）；需要 `@prisma/adapter-pg` driver adapter；seed 配置在 `prisma.config.ts` 而非 `package.json`
- **直接在 master 分支开发**，不创建 git 分支或 worktree（已验证无冲突）
- 后端 `backend/.npmrc` 格式是 `key=value`，不是 YAML；`onlyBuiltDependencies=esbuild` 写成 YAML 会报 npm warn

### 数据库表设计

三张表：`Post`、`Tag`、`Project`。Post ↔ Tag 是**隐式多对多**，Prisma 自动生成 `_PostToTag` 中间表。

```prisma
model Post {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique    // API 路由基于此字段
  content     String               // Markdown 原文，从 blog/posts/ 加载
  excerpt     String?
  publishedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tags        Tag[]               // 隐式多对多
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique            // 显示名："C++"
  slug  String @unique            // URL 用："cpp"
  posts Post[]
}

model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  links       Json?               // [{ label: "GitHub", url: "..." }]
  status      String   @default("building")  // building | done | experiment
  createdAt   DateTime @default(now())
}
```

- **为什么隐式多对多不用显式中间表**：目前标签不需要排序/权重，隐式够用；`tags: { connect: [{ slug }] }` 比手动维护中间表简洁
- **为什么用 slug 不用 id**：URL 可读 (`/blog/cpp-pointer-reference`)、迁移友好、SEO 友好
- **Project 表的 links 用 JSON**：每项目链接数量不定，JSON 阵列避冗余字段

### 博客系统踩坑记录

1. **marked.parse() 返回 string 不是 Promise**（marked v18 默认同步，无 `async` renderer 则同步）
2. **Vue scoped CSS 不作用于 v-html**：`<style scoped>` 中的 `.post-content h2` 不会匹配 `v-html` 渲染的元素，post-content 样式必须写在非 scoped 的 `<style>` 块中
3. **Vue Router 复用组件时 `onMounted` 不会重新执行**：`/blog/:slug` 间导航时组件实例被复用，需要用 `watch(route.params.slug)` 监听路由参数变化来重新 fetch 数据。阅读进度条同理 —— 切换文章后需重置进度。
4. **IntersectionObserver 在 v-html 场景下时序不可靠**：TocSidebar 已从 IntersectionObserver 改为 scroll 事件 + `requestAnimationFrame` 追踪当前标题。原理：遍历 `.post-content h2[id]`，找最后一个 `getBoundingClientRect().top <= 100` 的那个高亮。
5. **`fetchTags()` 无 try/catch 会导致 Promise.all 整体失败**：已在 posts.ts 中加错误降级
6. **同名标题需要 ID 去重**：`marked` renderer 和 `extractToc()` 都用 `uniqueId()` 函数（同名追加 `-2`, `-3`），否则 Vue `:key` 重复告警。两处各自维护 `Map<string, number>` 计数器，因遍历顺序一致，生成的 ID 保证相同。

## Skill 自动加载规则

以下规则覆盖本项目最常见的任务类型。Agent 在匹配到对应场景时，**必须先加载 Skill 再动手**。

### 本项目适用的 Skills

| 场景 | 必须加载的 Skill | 位置 |
|------|-----------------|------|
| 任何视觉/UI/样式改动 | `frontend-design` + `design-taste-frontend` | 用户级 |
| 新功能、新 section、重构 | `brainstorming` | 项目级 |
| 修 bug、异常行为 | `systematic-debugging` | 项目级 |
| 多步骤实现任务 | `writing-plans` | 项目级 |
| 写新 Skill 或改现有 Skill | `writing-skills` | 项目级 |
| 功能完成、合并前自查 | `verification-before-completion` | 项目级 |
| 现有网站视觉升级 | `redesign-existing-projects` | 用户级 |

### 缺失 Skill 处理

如果任务匹配上述场景，但对应的 Skill 在本地不存在，Agent 应：
1. 告知用户缺少哪个 Skill
2. 使用 `find-skills` Skill 搜索在线可用的替代方案
3. 或直接使用 `Skill` 工具尝试加载（Claude Code 会自动从注册表下载）

<!-- superpowers-zh:begin (do not edit between these markers) -->
# Superpowers-ZH 中文增强版

本项目已安装 superpowers-zh 技能框架（20 个 skills）。

## 核心规则

1. **收到任务时，先检查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要检查
2. **设计先于编码** — 收到功能需求时，先用 brainstorming skill 做需求分析
3. **测试先于实现** — 写代码前先写测试（TDD）
4. **验证先于完成** — 声称完成前必须运行验证命令

## 可用 Skills

Skills 位于 `.claude/skills/` 目录，每个 skill 有独立的 `SKILL.md` 文件。

- **brainstorming**: 在任何创造性工作之前必须使用此技能——创建功能、构建组件、添加功能或修改行为。在实现之前先探索用户意图、需求和设计。
- **chinese-code-review**: 中文 review 沟通参考——话术模板、分级标注（必须修复/建议修改/仅供参考）、国内团队常见反模式应对。仅在用户显式 /chinese-code-review 时调用，不要根据上下文自动触发。
- **chinese-commit-conventions**: 中文 commit 与 changelog 配置参考——Conventional Commits 中文适配、commitlint/husky/commitizen 中文模板、conventional-changelog 中文配置。仅在用户显式 /chinese-commit-conventions 时调用，不要根据上下文自动触发。
- **chinese-documentation**: 中文文档排版参考——中英文空格、全半角标点、术语保留、链接格式、中文文案排版指北约定。仅在用户显式 /chinese-documentation 时调用，不要根据上下文自动触发。
- **chinese-git-workflow**: 国内 Git 平台配置参考——Gitee、Coding.net、极狐 GitLab、CNB 的 SSH/HTTPS/凭据/CI 接入差异与镜像同步配置。仅在用户显式 /chinese-git-workflow 时调用，不要根据上下文自动触发。
- **dispatching-parallel-agents**: 当面对 2 个以上可以独立进行、无共享状态或顺序依赖的任务时使用
- **executing-plans**: 当你有一份书面实现计划需要在单独的会话中执行，并设有审查检查点时使用
- **finishing-a-development-branch**: 当实现完成、所有测试通过、需要决定如何集成工作时使用——通过提供合并、PR 或清理等结构化选项来引导开发工作的收尾
- **mcp-builder**: MCP 服务器构建方法论 — 系统化构建生产级 MCP 工具，让 AI 助手连接外部能力
- **receiving-code-review**: 收到代码审查反馈后、实施建议之前使用，尤其当反馈不明确或技术上有疑问时——需要技术严谨性和验证，而非敷衍附和或盲目执行
- **requesting-code-review**: 完成任务、实现重要功能或合并前使用，用于验证工作成果是否符合要求
- **subagent-driven-development**: 当在当前会话中执行包含独立任务的实现计划时使用
- **systematic-debugging**: 遇到任何 bug、测试失败或异常行为时使用，在提出修复方案之前执行
- **test-driven-development**: 在实现任何功能或修复 bug 时使用，在编写实现代码之前
- **using-git-worktrees**: 当需要开始与当前工作区隔离的功能开发，或在执行实现计划之前使用——通过原生工具或 git worktree 回退机制确保隔离工作区存在
- **using-superpowers**: 在开始任何对话时使用——确立如何查找和使用技能，要求在任何响应（包括澄清性问题）之前调用 Skill 工具
- **verification-before-completion**: 在宣称工作完成、已修复或测试通过之前使用，在提交或创建 PR 之前——必须运行验证命令并确认输出后才能声称成功；始终用证据支撑断言
- **workflow-runner**: 在 Claude Code / OpenClaw / Cursor 中直接运行 agency-orchestrator YAML 工作流——无需 API key，使用当前会话的 LLM 作为执行引擎。当用户提供 .yaml 工作流文件或要求多角色协作完成任务时触发。
- **writing-plans**: 当你有规格说明或需求用于多步骤任务时使用，在动手写代码之前
- **writing-skills**: 当创建新技能、编辑现有技能或在部署前验证技能是否有效时使用

## 如何使用

当任务匹配某个 skill 时，使用 `Skill` 工具加载对应 skill 并严格遵循其流程。绝不要用 Read 工具读取 SKILL.md 文件。

如果你认为哪怕只有 1% 的可能性某个 skill 适用于你正在做的事情，你必须调用该 skill 检查。
<!-- superpowers-zh:end -->

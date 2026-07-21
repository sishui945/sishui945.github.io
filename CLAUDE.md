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
| 一 | 7/16–7/25 | **个人网站**（Day 1–6 原生已跑通 → Day 7–10 Vue3+NestJS 全栈升级） | C++ |
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

- 主页 6 个 section：Hero → 关于我 → 项目 → 技能 → 博客预览 → 联系
- 博客系统：文章列表页（标签筛选）+ 详情页（marked 渲染 Markdown）+ 三列布局（文章列表 | 正文 | TOC 树形目录）
- 暗色模式（`darkMode: 'class'` + localStorage 持久化）+ 主题切换按钮 Web Component
- 响应式（移动优先：1 列 → md:2 列 → lg:3 列）
- 数据驱动渲染：数据文件 → render 函数 → DOM
- 导航高亮（IntersectionObserver）+ 滚动到顶部按钮 + section 滚动揭示动画

### 规划中功能

- Giscus 评论、留言板、邮件订阅
- 音乐播放器（默认关闭）、交互彩蛋
- 部署到 Vercel

## 技术栈

- **构建工具**: Vite 8（Rolldown），多页构建（`vite.config.js`）
- **Markdown 渲染**: marked
- **CSS**: Tailwind CSS 3 + PostCSS + Autoprefixer
- **包管理器**: pnpm
- **无框架** — 纯 HTML + 原生 JS (ES modules)，数据视图分离

## 项目结构

```
index.html              # 主页面 — 6 个 section，纯 Tailwind 类名
vite.config.js          # Vite 多页构建配置（3 入口）
blog/
  index.html            # 文章列表页（标签筛选 + 卡片网格）
  post.html             # 文章详情页（三列布局：文章列表 | 正文 | TOC）
  posts/                # Markdown 文章源文件，分子目录管理
    cpp/                #   C++ 相关文章
    css/                #   CSS 相关文章
src/
  style.css             # Tailwind 指令 + 动画 + 主题过渡 + Markdown 渲染样式 + 侧栏样式
  main.js               # 主页 JS 入口：初始化渲染 + 暗色模式 + 滚动效果
  blog-list.js          # 博客列表页 JS 入口（标签筛选 + 卡片渲染）
  blog-post.js          # 博客详情页 JS 入口（marked 渲染 + TOC + scroll spy）
  theme.js              # 暗色模式切换 + localStorage 持久化
  theme-button.js       # <theme-button> Web Component（太阳/月亮切换动画）
  render.js             # 6 个渲染函数（renderSkills/renderProjects/...）
  data/
    skills.js           # 技能数据（按类别分组：语言/前端/工具/创意）
    projects.js         # 项目数据（含 status + links）
    contact.js          # 联系方式
    about-tags.js       # 兴趣标签云
    interests.js        # Hero 兴趣徽章
    timeline.js         # 学习旅程数据（当前未挂载到页面）
    blog-posts.js       # 博客元数据（id/标题/日期/标签/摘要 + ?raw import .md 文件）
  assets/               # 图片（hero.png, logo.png）
public/                 # 静态资源（favicon.svg）
doc/                    # 大学规划文档（不参与构建）
```

## 数据视图分离模式

### 首页 section（沿用模式）

1. 在 `src/data/xxx.js` 定义数据数组
2. 在 `src/render.js` 写 `renderXxx(container, data)` 函数
3. 在 `index.html` 放空容器 `<div id="xxx-grid">`
4. 在 `src/main.js` 的 `DOMContentLoaded` 里调用渲染

### 博客系统（新增模式）

- 文章 Markdown 原文放在 `blog/posts/<category>/<slug>.md`
- 元数据注册在 `src/data/blog-posts.js`：`id`、`title`、`date`、`excerpt`、`tags`、`slug`，通过 `import x from '../../blog/posts/...?raw'` 导入正文
- 列表页 `blog/index.html` → JS 入口 `src/blog-list.js`
- 详情页 `blog/post.html` → JS 入口 `src/blog-post.js`（读 `?id=` 参数 → `marked.parse()` → 渲染 + 侧栏 TOC）
- 新增文章只需：1) 写 `.md` 文件 2) 在 `blog-posts.js` 加一条 import + 元数据

## 注意事项

- 环境变量在 .env 文件中，不要提交到 Git
- 所有新功能先创建 Git 分支再开发
- 数据修改只需编辑 `src/data/` 下的对应文件，不动 render 函数

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

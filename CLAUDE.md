# 个人博客（个人网站）

## 项目概述

- **定位**：我的**数字名片**和**项目集散中心**。
- **内容**：
    - **主页**：你的简介、技能树、核心理念。
    - **博客**：记录你的学习笔记（C++心得、哲学思考）、项目复盘等。
    - **项目集**：下面所有项目的展示页，附上GitHub链接、演示视频。
    - **互动与社区：和访客建立连接**
        - **评论系统**：在博客或作品下开放评论（如Disqus、Giscus），接受反馈。
        - **留言板/访客簿**：一个轻量的公共留言区，增加人情味。
        - **邮件通讯订阅**：让喜欢你内容的读者留下邮箱
        - **小调查/投票**：偶尔发起一个有趣的问题，收集大家的看法。
    - **资源推荐**：你整理的书单、常用工具、学习资源、好物清单，附上简短点评。
    - **个性化与趣味**：
      - 音乐播放器：共享你正在听的歌，或作为网站背景音乐（但最好默认关闭，由访客手动开启）。
      - 小游戏/交互彩蛋：一个隐藏的点击彩蛋、一个小游戏，对于技术向个人站来说，本身就是能力和个性的展露。

## 技术栈

- **构建工具**: Vite 8 (底层使用 Rolldown)
- **CSS**: Tailwind CSS 3 + PostCSS + Autoprefixer
- **包管理器**: pnpm
- **无框架** — 纯 HTML + 原生 JS (ES modules)

## 项目结构

```
index.html          # 主页面 — 自包含的 Tailwind 页面（导航、Hero、技能卡片、Footer）
src/
  style.css         # Tailwind 指令 (@tailwind base/components/utilities)
  main.js           # ⚠️ Vite 脚手架遗留代码，引用了不存在的 #app，当前未被 index.html 使用
  counter.js        # ⚠️ 同上，脚手架遗留的计数器组件
  assets/           # 图片和 SVG
public/             # 静态资源 (favicon, icons sprite)
```

## 关键注意点

- `index.html` 没有 `<div id="app">` 容器，它是一张完整的独立页面，所有内容通过 Tailwind 类名直接写在 HTML 中
- `src/main.js` 尝试向 `#app` 注入内容，但该元素不存在，因此脚本虽然加载但实际无效果
- 页面中的技能进度条使用内联 `style="width: X%"` 控制宽度
- Tailwind 配置的 content 路径包含 `./index.html` 和 `./src/**/*.{js,ts,jsx,tsx}`
- `.vscode/launch.json` 配置了 Edge 浏览器调试，端口 8080（与 Vite 默认 5173 不一致，需手动对齐）

## 编码规范

## 当前开发状态
- 项目初始化完成
## 注意事项

- 环境变量在 .env 文件中，不要提交到 Git
- 所有新功能先创建 Git 分支再开发

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

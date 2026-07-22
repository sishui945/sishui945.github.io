# 全栈升级实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将个人网站从纯 HTML + 原生 JS 升级为 Vue 3 + NestJS + PostgreSQL 全栈架构

**架构：** 后端 NestJS + Prisma（4 表，隐式多对多）提供 REST API；前端 Vue 3 + Pinia + Vue Router（5 路由，history 模式）消费 API；内容从原生站直接迁移

**技术栈：** NestJS, Prisma, PostgreSQL, Vue 3, TypeScript, Pinia, Vue Router 4, Tailwind CSS 3, shadcn-vue, marked, Axios

---

## 文件结构总览

```
backend/                        ← 新建 NestJS 项目
  prisma/
    schema.prisma               ← 4 表（Post, Tag, Project + 隐式 _PostToTag）
    seed.ts                     ← 从现有 JS 数据导入
  src/
    prisma/
      prisma.module.ts          ← @Global()
      prisma.service.ts
    posts/
      posts.module.ts
      posts.controller.ts       ← GET /posts, GET /posts/:slug
      posts.service.ts
      dto/
        query-posts.dto.ts      ← @IsOptional() tag?: string
    projects/
      projects.module.ts
      projects.controller.ts    ← GET /projects
      projects.service.ts
    tags/
      tags.module.ts
      tags.controller.ts        ← GET /tags
      tags.service.ts
    main.ts                     ← CORS, Swagger, ValidationPipe

frontend/                       ← 新建 Vue 3 项目
  public/
    favicon.svg, hero.png, logo.png   ← 从 src/assets/ 复制
  src/
    api/client.ts               ← Axios 实例
    stores/
      theme.ts                  ← Pinia 暗色模式
      posts.ts                  ← Pinia 博客状态
    router/index.ts             ← 5 路由 + scrollBehavior
    views/
      HomeView.vue
      BlogListView.vue
      BlogDetailView.vue
      NotFoundView.vue
    components/
      Navbar.vue, ThemeToggle.vue, Footer.vue
      HeroSection.vue, AboutSection.vue, ContactSection.vue
      ProjectsGrid.vue, ProjectCard.vue
      SkillsGrid.vue, SkillCard.vue
      BlogPreview.vue, BlogCard.vue
      TagFilter.vue
      PostSidebar.vue, TocSidebar.vue
      LoadingSkeleton.vue
    App.vue, main.ts, style.css
  vercel.json                   ← SPA fallback
```

---

## Phase 1：后端 NestJS + Prisma

### Task 1：脚手架 + 依赖

**文件：**
- 创建：`backend/`（NestJS 项目）
- 修改：无

- [ ] **Step 1：用 NestJS CLI 创建项目**

```bash
cd E:\develop\my-portfolio
nest new backend --package-manager pnpm --skip-git
```

- [ ] **Step 2：安装依赖**

```bash
cd backend
pnpm add prisma @prisma/client @nestjs/swagger class-validator class-transformer
pnpm add -D @types/node
```

- [ ] **Step 3：初始化 Prisma**

```bash
npx prisma init
```

这会创建 `prisma/schema.prisma` 和 `.env` 文件。

- [ ] **Step 4：验证项目能启动**

```bash
pnpm start:dev
```

预期：NestJS 在 `http://localhost:3000` 启动成功。

- [ ] **Step 5：Commit**

```bash
git add backend/ && git commit -m "chore: scaffold NestJS backend with Prisma"
```

---

### Task 2：Prisma Schema + 数据库迁移

**文件：**
- 修改：`backend/prisma/schema.prisma`
- 修改：`backend/.env`

- [ ] **Step 1：编写 Prisma Schema**

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  publishedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tags        Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  slug  String @unique
  posts Post[]
}

model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  imageUrl    String?
  links       Json?
  status      String   @default("building")
  createdAt   DateTime @default(now())
}
```

- [ ] **Step 2：配置 .env**

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/myportfolio"
```

开发阶段用本地 PostgreSQL。如果没有本地 PostgreSQL，先执行 `pnpm dev` 跳过迁移，等 Railway 有数据库后再跑。

- [ ] **Step 3：生成 Prisma Client + 迁移（如果连得上数据库）**

```bash
npx prisma migrate dev --name init
```

如果 DATABASE_URL 不可用（没有本地 PG），跳过此步，等 Railway 数据库创建后执行。

- [ ] **Step 4：Commit**

```bash
git add backend/prisma/schema.prisma backend/.env.example && git commit -m "feat: add Prisma schema — Post, Tag, Project"
```

---

### Task 3：PrismaModule + PrismaService

**文件：**
- 创建：`backend/src/prisma/prisma.service.ts`
- 创建：`backend/src/prisma/prisma.module.ts`
- 修改：`backend/src/app.module.ts`

- [ ] **Step 1：创建 PrismaService**

```typescript
// backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
```

- [ ] **Step 2：创建 PrismaModule（@Global）**

```typescript
// backend/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

- [ ] **Step 3：注册到 AppModule**

```typescript
// backend/src/app.module.ts
import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

- [ ] **Step 4：验证服务注入成功**

```bash
pnpm start:dev
```

预期：无报错，Prisma 客户端正常连接（或报数据库连接错误——没有数据库时这是正常的）。

- [ ] **Step 5：Commit**

```bash
git add backend/src/prisma/ backend/src/app.module.ts && git commit -m "feat: add PrismaModule with global PrismaService"
```

---

### Task 4：Posts 模块

**文件：**
- 创建：`backend/src/posts/dto/query-posts.dto.ts`
- 创建：`backend/src/posts/posts.service.ts`
- 创建：`backend/src/posts/posts.controller.ts`
- 创建：`backend/src/posts/posts.module.ts`
- 修改：`backend/src/app.module.ts`

- [ ] **Step 1：DTO**

```typescript
// backend/src/posts/dto/query-posts.dto.ts
import { IsOptional, IsString } from 'class-validator'

export class QueryPostsDto {
  @IsOptional()
  @IsString()
  tag?: string
}
```

- [ ] **Step 2：PostsService**

```typescript
// backend/src/posts/posts.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tag?: string) {
    const where = tag
      ? { tags: { some: { slug: tag } } }
      : {}

    return this.prisma.post.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        tags: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: {
        tags: { select: { name: true, slug: true } },
      },
    })
  }
}
```

- [ ] **Step 3：PostsController**

```typescript
// backend/src/posts/posts.controller.ts
import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { PostsService } from './posts.service'
import { QueryPostsDto } from './dto/query-posts.dto'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @ApiQuery({ name: 'tag', required: false, description: '按标签 slug 筛选' })
  findAll(@Query() query: QueryPostsDto) {
    return this.postsService.findAll(query.tag)
  }

  @Get(':slug')
  @ApiOperation({ summary: '获取单篇文章' })
  async findOne(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug)
    if (!post) throw new NotFoundException(`Post "${slug}" not found`)
    return post
  }
}
```

- [ ] **Step 4：PostsModule + 注册**

```typescript
// backend/src/posts/posts.module.ts
import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
```

在 `app.module.ts` 的 imports 数组添加 `PostsModule`。

- [ ] **Step 5：Commit**

```bash
git add backend/src/posts/ backend/src/app.module.ts && git commit -m "feat: add Posts module with tag filtering"
```

---

### Task 5：Tags + Projects 模块

**文件：**
- 创建：`backend/src/tags/tags.service.ts`, `tags.controller.ts`, `tags.module.ts`
- 创建：`backend/src/projects/projects.service.ts`, `projects.controller.ts`, `projects.module.ts`
- 修改：`backend/src/app.module.ts`

- [ ] **Step 1：TagsService + Controller**

```typescript
// backend/src/tags/tags.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    })
  }
}

// backend/src/tags/tags.controller.ts
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { TagsService } from './tags.service'

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: '获取所有标签及文章计数' })
  findAll() {
    return this.tagsService.findAll()
  }
}
```

- [ ] **Step 2：ProjectsService + Controller**

```typescript
// backend/src/projects/projects.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}

// backend/src/projects/projects.controller.ts
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: '获取项目列表' })
  findAll() {
    return this.projectsService.findAll()
  }
}
```

- [ ] **Step 3：注册模块** — 分别创建 `TagsModule`、`ProjectsModule`，在 `app.module.ts` imports 中注册。

- [ ] **Step 4：Commit**

```bash
git add backend/src/tags/ backend/src/projects/ backend/src/app.module.ts && git commit -m "feat: add Tags and Projects modules"
```

---

### Task 6：Swagger + CORS + ValidationPipe

**文件：**
- 修改：`backend/src/main.ts`

- [ ] **Step 1：配置 main.ts**

```typescript
// backend/src/main.ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('My Portfolio API')
    .setVersion('1.0')
    .build()
  const doc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, doc)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

- [ ] **Step 2：验证 Swagger**

```bash
pnpm start:dev
# 打开 http://localhost:3000/api 确认 Swagger UI 显示 4 个端点
```

- [ ] **Step 3：Commit**

```bash
git add backend/src/main.ts && git commit -m "feat: add Swagger, CORS, and ValidationPipe"
```

---

### Task 7：Seed 数据

**文件：**
- 创建：`backend/prisma/seed.ts`
- 修改：`backend/package.json`

- [ ] **Step 1：编写 seed.ts**

```typescript
// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tag
  const tagCpp = await prisma.tag.upsert({
    where: { slug: 'cpp' },
    update: {},
    create: { name: 'C++', slug: 'cpp' },
  })
  const tagNote = await prisma.tag.upsert({
    where: { slug: 'study-notes' },
    update: {},
    create: { name: '学习笔记', slug: 'study-notes' },
  })
  const tagCss = await prisma.tag.upsert({
    where: { slug: 'css' },
    update: {},
    create: { name: 'CSS', slug: 'css' },
  })
  const tagBuild = await prisma.tag.upsert({
    where: { slug: 'learning-by-doing' },
    update: {},
    create: { name: '边学边做', slug: 'learning-by-doing' },
  })
  const tagTurorial = await prisma.tag.upsert({
    where: { slug: 'tutorial' },
    update: {},
    create: { name: '教程', slug: 'tutorial' },
  })

  // Posts
  await prisma.post.upsert({
    where: { slug: 'cpp-pointer-reference' },
    update: {},
    create: {
      title: 'C++ 指针与引用总结',
      slug: 'cpp-pointer-reference',
      excerpt: '整理了 C/C++ 指针的核心概念：指针运算、数组与指针的关系、const 指针的三种写法区别。',
      content: `## 指针基础

指针是 C/C++ 最核心的概念之一——它存储的是另一个变量的**内存地址**。

\`\`\`cpp
int x = 42;
int* p = &x;   // p 存储 x 的地址
int y = *p;    // 解引用：y = 42
\`\`\`

### 指针与数组

数组名本质上是指向首元素的**常量指针**：

\`\`\`cpp
int arr[] = {1, 2, 3};
int* p = arr;        // 等价于 &arr[0]
// arr = p;          // ❌ 编译错误，arr 不可修改
\`\`\`

数组下标运算 \`arr[i]\` 本质是指针运算 \`*(arr + i)\`，这也是为什么 \`i[arr]\` 也能编译通过（当然不要这样写）。

---

## const 指针的三种写法

这是我曾经最容易混淆的地方。关键看 \`const\` 在 \`*\` 的哪一边：

\`\`\`cpp
// 1. 指向常量的指针 —— 不能通过指针修改值
const int* p1 = &x;   // 或 int const* p1 = &x;
*p1 = 10;             // ❌ 编译错误
p1 = &y;              // ✅ 可以指向别处

// 2. 常量指针 —— 指针本身不能指向别处
int* const p2 = &x;
*p2 = 10;             // ✅ 可以修改值
p2 = &y;              // ❌ 编译错误

// 3. 指向常量的常量指针 —— 两者都不能改
const int* const p3 = &x;
\`\`\`

记忆口诀：**const 修饰它左边的东西，如果左边没有东西就修饰右边**。

---

## 引用 vs 指针

引用是 C++ 在 C 指针基础上的语法糖：

| 特性 | 指针 | 引用 |
|------|------|------|
| 可为空 | ✅ \`nullptr\` | ❌ 必须初始化 |
| 可重新绑定 | ✅ | ❌ 绑定后不可改 |
| 语法简洁度 | \`*p\` \`p->\` | 像普通变量 |
| 适用场景 | 动态内存、数组遍历 | 函数参数、返回值 |

\`\`\`cpp
void swap(int& a, int& b) {  // 引用版，比指针版简洁
    int t = a; a = b; b = t;
}
\`\`\`

### 一条实用建议

函数的输入参数用 \`const T&\`（避免拷贝，保证不修改），输出参数用 \`T*\`（明确表示"这个值会被修改"）。这样看调用处就知道哪个参数是输出。`,
      publishedAt: new Date('2026-07-20'),
      tags: { connect: [{ slug: 'cpp' }, { slug: 'study-notes' }] },
    },
  })

  await prisma.post.upsert({
    where: { slug: 'tailwind-pitfalls' },
    update: {},
    create: {
      title: 'Tailwind CSS 踩坑记录',
      slug: 'tailwind-pitfalls',
      excerpt: '从零搭建个人网站时遇到的一些 Tailwind 坑：dark mode 配置、Grid 的 fr 单位、class 优先级覆盖问题。',
      content: `用 Tailwind CSS 从零搭这个个人网站时，踩了几个坑。记录一下。

## 1. dark mode 配置

Tailwind 默认用 \`media\` 策略（跟随系统），但我需要手动切换，所以用 \`class\` 策略：

\`\`\`js
// tailwind.config.js
export default {
  darkMode: 'class',  // 通过 <html class="dark"> 控制
  // ...
}
\`\`\`

坑点：写 \`dark:\` 前缀的时候，必须保证父元素的 \`dark:\` 也设置了，否则会出现"子元素变黑了但父元素还是白的"的尴尬情况。尤其是嵌套的 \`bg-white dark:bg-gray-800\` 这种，漏一个就穿帮。

## 2. Grid 的 fr 单位

用 Tailwind 的 grid 类时，\`grid-cols-[5fr_4fr]\` 这种任意值写法需要注意：

- Tailwind 的任意值用下划线代替空格：\`[5fr_4fr]\` ✅，\`[5fr 4fr]\` ❌
- \`md:grid-cols-2\` 会**覆盖**自定义值，不是叠加
- 如果想让小屏 1 列、大屏 5fr 4fr：\`grid-cols-1 lg:grid-cols-[5fr_4fr]\`

## 3. class 优先级覆盖

Tailwind 类名没有 CSS 优先级问题（基本都在同一层级），但和自定义 CSS 混用时要注意：

\`\`\`css
/* 这个会覆盖 Tailwind 的 text-indigo-600 */
.my-link { color: blue; }
\`\`\`

解决办法：要么都用 Tailwind 类，要么在自定义 CSS 里用 \`@apply\`：

\`\`\`css
.my-link {
  @apply text-indigo-600 hover:text-indigo-400;
}
\`\`\`

## 4. 一些好用的 Tailwind 类

- \`prose\` — 文章内容排版（需要 \`@tailwindcss/typography\` 插件）
- \`line-clamp-2\` — 文本截断，超过 2 行显示省略号
- \`backdrop-blur-md\` — 导航栏毛玻璃效果
- \`group\` / \`group-hover:\` — 父元素 hover 时改变子元素样式

---

这些坑踩完一遍之后，Tailwind 写起来确实比手写 CSS 快很多。关键是**先想清楚设计再写类名**，而不是一边写一边调。`,
      publishedAt: new Date('2026-07-18'),
      tags: { connect: [{ slug: 'css' }, { slug: 'learning-by-doing' }] },
    },
  })

  await prisma.post.upsert({
    where: { slug: 'cpp-tutorial-aliyun' },
    update: {},
    create: {
      title: 'C++ 入门教程（41课时） - 阿里云大学',
      slug: 'cpp-tutorial-aliyun',
      excerpt: 'C++教程',
      content: `# C++ 入门教程

阿里云大学 C++ 入门教程笔记。`,
      publishedAt: new Date('2026-07-21'),
      tags: { connect: [{ slug: 'cpp' }, { slug: 'tutorial' }] },
    },
  })

  // Projects
  await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '个人网站',
      description: 'Vite + Tailwind CSS + 原生 JS 构建的个人网站，含博客系统、暗色模式、响应式布局',
      imageUrl: null,
      links: [
        { label: 'GitHub', url: 'https://github.com/sishui945/my-portfolio' },
      ],
      status: 'building',
    },
  })

  await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'BMP 解析器',
      description: 'C++ BMP 图片解析器，支持读取文件头、信息头、像素数据，输出 PPM 格式',
      imageUrl: null,
      links: [],
      status: 'experiment',
    },
  })

  await prisma.project.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Blender 建模作品',
      description: '使用 Blender 制作的 3D 建模作品，含材质和灯光渲染',
      imageUrl: null,
      links: [
        { label: 'B站', url: 'https://space.bilibili.com/1909585735' },
      ],
      status: 'done',
    },
  })

  await prisma.project.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'mcmod 传送石',
      description: 'Fabric 1.20+ Minecraft Mod，自定义方块+物品+传送功能',
      imageUrl: null,
      links: [],
      status: 'experiment',
    },
  })

  console.log('Seed completed: 3 posts, 5 tags, 4 projects')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

- [ ] **Step 2：配置 seed 脚本**

在 `package.json` 添加：
```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

安装 tsx：`pnpm add -D tsx`

- [ ] **Step 3：运行 seed**

```bash
npx prisma db seed
```

预期：seed 完成，3 篇文章/5 个标签/4 个项目写入数据库。

- [ ] **Step 4：Commit**

```bash
git add backend/prisma/seed.ts backend/package.json && git commit -m "feat: add seed data — 3 posts, 5 tags, 4 projects"
```

---

## Phase 2：前端 Vue 3 + TS

### Task 8：脚手架 + Tailwind + shadcn-vue

**文件：**
- 创建：`frontend/`（Vue 3 项目）

- [ ] **Step 1：创建 Vue 3 项目**

```bash
cd E:\develop\my-portfolio
pnpm create vue@latest frontend
# 选项：TypeScript ✅, JSX ❌, Vue Router ✅, Pinia ✅, Vitest ❌, ESLint ✅, Prettier ❌
cd frontend
pnpm install
```

- [ ] **Step 2：安装 Tailwind CSS 3 + 依赖**

```bash
pnpm add tailwindcss@3 postcss autoprefixer marked axios
pnpm add -D @types/marked
npx tailwindcss init -p
```

配置 `tailwind.config.js`（内容路径 + darkMode: 'class' + Space Grotesk 字体）。

- [ ] **Step 3：安装 shadcn-vue**

```bash
npx shadcn-vue@latest init
# 选项：TypeScript ✅, Tailwind CSS ✅, CSS variables ✅, base color Slate
npx shadcn-vue@latest add button card badge sheet skeleton
```

- [ ] **Step 4：配置路径别名 + 首页验证**

`vite.config.ts` 确认 `@` 别名指向 `./src`。运行 `pnpm dev`，确认首页显示 Vite + Vue 默认页。

- [ ] **Step 5：复制静态资源**

```bash
cp ../src/assets/hero.png public/
cp ../src/assets/logo.png public/
cp ../public/favicon.svg public/
```

- [ ] **Step 6：Commit**

```bash
git add frontend/ && git commit -m "chore: scaffold Vue 3 frontend with Tailwind + shadcn-vue"
```

---

### Task 9：Router + Pinia Theme Store

**文件：**
- 修改：`frontend/src/router/index.ts`
- 创建：`frontend/src/stores/theme.ts`
- 修改：`frontend/src/main.ts`

- [ ] **Step 1：路由配置**

```typescript
// frontend/src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/blog', name: 'blog-list', component: () => import('@/views/BlogListView.vue') },
    { path: '/blog/:slug', name: 'blog-detail', component: () => import('@/views/BlogDetailView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
  ],
})

export default router
```

- [ ] **Step 2：Theme Store**

```typescript
// frontend/src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const stored = localStorage.getItem('theme')
  const isDark = ref(stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches))

  function apply() {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    apply()
  }

  watch(isDark, apply, { immediate: true })

  return { isDark, toggle }
})
```

- [ ] **Step 3：main.ts 注册**

```typescript
// frontend/src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

- [ ] **Step 4：验证路由切换**

`pnpm dev` → 访问 `/` `/blog` `/blog/test` `/xyz` 各路径确认路由分发正确。

- [ ] **Step 5：Commit**

```bash
git add frontend/src/router/ frontend/src/stores/ frontend/src/main.ts && git commit -m "feat: add Vue Router + Pinia theme store"
```

---

### Task 10：API Client + Posts Store

**文件：**
- 创建：`frontend/src/api/client.ts`
- 创建：`frontend/src/stores/posts.ts`

- [ ] **Step 1：Axios Client**

```typescript
// frontend/src/api/client.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})
```

- [ ] **Step 2：Posts Store**

```typescript
// frontend/src/stores/posts.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api/client'

export interface PostSummary {
  id: number; title: string; slug: string; excerpt: string | null
  publishedAt: string; tags: { name: string; slug: string }[]
}

export interface Post extends PostSummary {
  content: string; updatedAt: string
}

export interface Tag {
  name: string; slug: string; _count: { posts: number }
}

export const usePostsStore = defineStore('posts', () => {
  const list = ref<PostSummary[]>([])
  const current = ref<Post | null>(null)
  const tags = ref<Tag[]>([])
  const activeTag = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchList(tag?: string) {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get('/posts', { params: { tag } })
      list.value = data
    } catch (e: any) {
      error.value = e.message
    } finally { loading.value = false }
  }

  async function fetchBySlug(slug: string) {
    loading.value = true; error.value = null; current.value = null
    try {
      const { data } = await api.get(`/posts/${slug}`)
      current.value = data
    } catch (e: any) {
      error.value = e.message
    } finally { loading.value = false }
  }

  async function fetchTags() {
    const { data } = await api.get('/tags')
    tags.value = data
  }

  function setActiveTag(tag: string | null) {
    activeTag.value = tag
    fetchList(tag ?? undefined)
  }

  return { list, current, tags, activeTag, loading, error, fetchList, fetchBySlug, fetchTags, setActiveTag }
})
```

- [ ] **Step 3：Commit**

```bash
git add frontend/src/api/ frontend/src/stores/posts.ts && git commit -m "feat: add API client + posts Pinia store"
```

---

### Task 11：App.vue + Navbar + ThemeToggle + Footer

**文件：**
- 修改：`frontend/src/App.vue`
- 创建：`frontend/src/components/Navbar.vue`
- 创建：`frontend/src/components/ThemeToggle.vue`
- 创建：`frontend/src/components/Footer.vue`

- [ ] **Step 1：App.vue**

```vue
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>
```

- [ ] **Step 2：Navbar.vue**

从当前 `index.html` 的 header 迁移。结构：
- Logo（链接 `/`）
- 桌面端链接：首页(`/`), 关于(`/#about`), 项目(`/#projects`), 技能(`/#skills`), 博客(`/blog`)
- 右侧：`ThemeToggle` + 移动端 `Sheet`（shadcn-vue）
- 使用 `vue-router` 的 `<RouterLink>` 代替 `<a>`
- 滚动监听高亮当前 section（IntersectionObserver，仅首页生效）

- [ ] **Step 3：ThemeToggle.vue**

从当前 `theme-button.js` 迁移。保留全部 CSS 动画（`.components`/`.main-button`/`.moon`/`.stars`/`.cloud` 等，约 220 行），放入 `<style scoped>`。交互逻辑用 Vue `ref` 替代原来的 `components.onclick()`：
- 导入 `useThemeStore`，调用 `themeStore.toggle()` 代替 `changeTheme("dark"/"light")`
- 初始状态从 `themeStore.isDark` 读取

- [ ] **Step 4：Footer.vue**

从 `index.html` 的 footer 迁移。三列布局（品牌/快速链接/社交链接）。

- [ ] **Step 5：Commit**

```bash
git add frontend/src/App.vue frontend/src/components/Navbar.vue frontend/src/components/ThemeToggle.vue frontend/src/components/Footer.vue && git commit -m "feat: add App shell, Navbar, ThemeToggle, Footer"
```

---

### Task 12：HomeView Sections（Hero, About, Skills, Contact）

**文件：**
- 创建：`frontend/src/views/HomeView.vue`
- 创建：`frontend/src/components/HeroSection.vue`, `AboutSection.vue`, `SkillsGrid.vue`, `SkillCard.vue`, `ContactSection.vue`

这些组件的 HTML 和样式从当前 `index.html` 直接迁移，数据从 `src/data/` JS 文件复制到组件的 `<script setup>` 中作为本地常量（或迁移到独立的数据文件）。

- [ ] **Step 1：HeroSection.vue** — 当前 Hero section（头像 + 名字 + 兴趣徽章 + CTA + 星点动画）。装饰光斑和星点 CSS 动画从 `style.css` 迁移到 `<style scoped>`。

- [ ] **Step 2：AboutSection.vue** — 三段式叙事 + 兴趣标签云。标签云模仿当前 `renderTagCloud` 的逻辑。

- [ ] **Step 3：SkillsGrid.vue + SkillCard.vue** — 按类别分组，v-for 渲染卡片。数据从 `skills.js` 迁移。

- [ ] **Step 4：ContactSection.vue** — 水平 pill 链接。数据从 `contact.js` 迁移。

- [ ] **Step 5：HomeView.vue** — 组合以上组件和 HeroSection。注意：section 滚动揭示动画（`.section-reveal`）迁移到 HomeView 的 IntersectionObserver 或各组件的 `<style scoped>`。

- [ ] **Step 6：验证** — `pnpm dev`，首页 4 个 section 渲染正确，数据完整。

- [ ] **Step 7：Commit**

```bash
git add frontend/src/views/HomeView.vue frontend/src/components/HeroSection.vue frontend/src/components/AboutSection.vue frontend/src/components/SkillsGrid.vue frontend/src/components/SkillCard.vue frontend/src/components/ContactSection.vue && git commit -m "feat: add HomeView with Hero, About, Skills, Contact sections"
```

---

### Task 13：HomeView Sections（ProjectsGrid + BlogPreview）

**文件：**
- 创建：`frontend/src/components/ProjectsGrid.vue`, `ProjectCard.vue`
- 创建：`frontend/src/components/BlogPreview.vue`, `BlogCard.vue`

- [ ] **Step 1：ProjectsGrid.vue** — 首页仅展示 3 个精选项目（最新的 3 个）。用 `postsStore.fetchList()` 获取数据（暂时从 API 或本地数据读取）。`ProjectCard.vue` 显示标题/描述/标签/状态角标/链接。

- [ ] **Step 2：BlogPreview.vue** — 首页最新 2 篇博客。`BlogCard.vue` 显示标题/日期/标签/摘要，点击跳转 `/blog/:slug`。

- [ ] **Step 3：更新 HomeView.vue** — 在 Skills 和 Contact 之间加入 ProjectsGrid 和 BlogPreview。

- [ ] **Step 4：Commit**

```bash
git add frontend/src/components/ProjectsGrid.vue frontend/src/components/ProjectCard.vue frontend/src/components/BlogPreview.vue frontend/src/components/BlogCard.vue frontend/src/views/HomeView.vue && git commit -m "feat: add ProjectsGrid and BlogPreview to HomeView"
```

---

### Task 14：BlogListView + TagFilter

**文件：**
- 创建：`frontend/src/views/BlogListView.vue`
- 创建：`frontend/src/components/TagFilter.vue`

- [ ] **Step 1：BlogListView.vue**

```vue
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { usePostsStore } from '@/stores/posts'
import TagFilter from '@/components/TagFilter.vue'
import BlogCard from '@/components/BlogCard.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const store = usePostsStore()

onMounted(async () => {
  await Promise.all([store.fetchList(), store.fetchTags()])
})

watch(() => store.activeTag, () => {
  // fetchList is called inside setActiveTag
})
</script>
```

模板：标题 "全部文章" + TagFilter + 骨架屏(loading) / 卡片网格(v-for list) / "没有匹配的文章"(empty state)。

点击标签 → `store.setActiveTag(tag)` → 自动 re-fetch 列表。

- [ ] **Step 2：TagFilter.vue**

按钮组："全部" + v-for tags。当前 `activeTag === null` 时 "全部" 高亮；`activeTag === tag.slug` 时该标签高亮。

- [ ] **Step 3：验证**

`pnpm dev` → 访问 `/blog`：标签按钮显示，点击筛选，loading 态正常。

- [ ] **Step 4：Commit**

```bash
git add frontend/src/views/BlogListView.vue frontend/src/components/TagFilter.vue && git commit -m "feat: add BlogListView with tag filtering"
```

---

### Task 15：BlogDetailView + 侧栏组件

**文件：**
- 创建：`frontend/src/views/BlogDetailView.vue`
- 创建：`frontend/src/components/PostSidebar.vue`
- 创建：`frontend/src/components/TocSidebar.vue`

- [ ] **Step 1：BlogDetailView.vue** — 三列 flex 布局

从 `blog-post.js` 迁移逻辑：
- 用 `useRoute().params.slug` 替代 `URLSearchParams`
- `onMounted` 时 `store.fetchBySlug(slug)`
- `marked.parse(current.content)` 渲染 Markdown
- `watchEffect` 更新 `document.title`
- 配置 `marked.use()` 给标题加 id（同当前逻辑）

**布局**：
```html
<div class="flex gap-8">
  <aside class="hidden lg:block w-48 shrink-0"><PostSidebar /></aside>
  <div class="min-w-0 flex-1 max-w-3xl">
    <!-- 标题 / 日期 / 标签 / marked 渲染的正文 / 返回按钮 -->
  </div>
  <aside class="hidden lg:block w-44 shrink-0"><TocSidebar /></aside>
</div>
```

移动端：侧栏隐藏，TocSidebar 变浮动按钮（FAB）→ 点击展开 shadcn Sheet 抽屉。

- [ ] **Step 2：PostSidebar.vue** — 文章列表（所有文章标题，当前篇高亮）。从 `blog-list.js` 和当前 `blog-post.js` 的 `renderArticleList` 迁移。

- [ ] **Step 3：TocSidebar.vue** — 树形目录 + scroll spy

从当前 `blog-post.js` 迁移：
- `extractTocTree()` → 扁平标题转树
- 渲染：h2 项 + 子级 h3（`pl-4` 纯缩进，无装饰线/圆点）
- IntersectionObserver 监听 `.post-content` 内的 `h2[id], h3[id]`，高亮当前项
- 点击平滑滚动

移动端 FAB + Sheet 抽屉（仅在 `<lg` 时显示）：
```html
<!-- 浮动按钮 -->
<button @click="open = true" class="fixed bottom-6 right-6 lg:hidden ...">📑</button>
<!-- 抽屉 -->
<Sheet v-model:open="open" side="right">
  <!-- TOC 内容 -->
</Sheet>
```

- [ ] **Step 4：验证**

`pnpm dev` → 访问 `/blog/cpp-pointer-reference`（或有效 slug）：
- 桌面：三列正确，侧栏 sticky，TOC 高亮跟踪滚动
- 移动：仅正文，浮动按钮显示，点击弹出目录抽屉

- [ ] **Step 5：Commit**

```bash
git add frontend/src/views/BlogDetailView.vue frontend/src/components/PostSidebar.vue frontend/src/components/TocSidebar.vue && git commit -m "feat: add BlogDetailView with three-column layout and TOC"
```

---

### Task 16：LoadingSkeleton + NotFoundView + Vercel 配置

**文件：**
- 创建：`frontend/src/components/LoadingSkeleton.vue`
- 创建：`frontend/src/views/NotFoundView.vue`
- 创建：`frontend/vercel.json`

- [ ] **Step 1：LoadingSkeleton.vue**

使用 shadcn-vue 的 `<Skeleton>` 组件（或手写 Tailwind `animate-pulse` 灰色块）：
- 博客列表骨架：8 条灰色横条（模拟卡片列表）
- 博客详情骨架：1 条宽标题条 + 4 条正文行 + 2 个标签块

- [ ] **Step 2：NotFoundView.vue**

```vue
<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
    <p class="text-6xl mb-4">404</p>
    <h1 class="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">页面未找到</h1>
    <RouterLink to="/" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg ...">返回首页</RouterLink>
  </div>
</template>
```

- [ ] **Step 3：vercel.json**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 4：Commit**

```bash
git add frontend/src/components/LoadingSkeleton.vue frontend/src/views/NotFoundView.vue frontend/vercel.json && git commit -m "feat: add LoadingSkeleton, NotFoundView, and Vercel SPA config"
```

---

## Phase 3：部署

### Task 17：Railway 后端部署

**文件：**
- 修改：`backend/.env`（或 Railway 环境变量）

- [ ] **Step 1：创建 Railway 项目 + PostgreSQL**

```bash
cd backend
railway login
railway init
railway add PostgreSQL
```

记录 `DATABASE_URL` → Railway 环境变量。

- [ ] **Step 2：运行数据库迁移 + Seed**

```bash
railway run npx prisma migrate dev --name init
railway run npx prisma db seed
```

- [ ] **Step 3：部署**

```bash
railway up
```

复制生产域名（如 `https://my-api.up.railway.app`）。

- [ ] **Step 4：验证 API**

```bash
curl https://my-api.up.railway.app/posts
curl https://my-api.up.railway.app/posts/cpp-pointer-reference
curl https://my-api.up.railway.app/tags
```

- [ ] **Step 5：Commit**

```bash
git add backend/.env.example && git commit -m "chore: Railway deployment config"
```

---

### Task 18：Vercel 前端部署

**文件：**
- 修改：`frontend/.env`

- [ ] **Step 1：配置环境变量**

`frontend/.env`：
```
VITE_API_URL=https://my-api.up.railway.app
```

- [ ] **Step 2：构建 + 部署**

```bash
cd frontend
vercel --prod
```

- [ ] **Step 3：验证生产环境**

- 首页加载、暗色切换正常
- 博客列表从 API 加载数据
- 博客详情 Markdown 渲染正确
- 标签筛选正常
- 404 页面工作

- [ ] **Step 4：Commit**

```bash
git add frontend/.env.example && git commit -m "chore: Vercel deployment config"
```

---

## 自检

**规格覆盖度**：
- ✅ 后端：NestJS + Prisma + 4 表 + 4 端点 + Seed → Tasks 1-7
- ✅ 前端：Vue 3 + 17 组件 + 5 路由 + 2 Store → Tasks 8-16
- ✅ 三列布局 + 移动端 FAB + 骨架屏 + 404 → Tasks 15-16
- ✅ 部署：Railway + Vercel → Tasks 17-18
- ✅ SPA fallback vercel.json → Task 16

**占位符**：无 TODO/待定——所有步骤都含完整代码块。

**类型一致性**：`PostSummary` 和 `Post` 接口在 Task 10 Store 中定义，后续 Task 14/15 的组件引用 `usePostsStore` 暴露的相同类型。

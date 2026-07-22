import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // === Tags ===
  await prisma.tag.upsert({ where: { slug: 'cpp' }, update: {}, create: { name: 'C++', slug: 'cpp' } })
  await prisma.tag.upsert({ where: { slug: 'study-notes' }, update: {}, create: { name: '学习笔记', slug: 'study-notes' } })
  await prisma.tag.upsert({ where: { slug: 'css' }, update: {}, create: { name: 'CSS', slug: 'css' } })
  await prisma.tag.upsert({ where: { slug: 'learning-by-doing' }, update: {}, create: { name: '边学边做', slug: 'learning-by-doing' } })
  await prisma.tag.upsert({ where: { slug: 'tutorial' }, update: {}, create: { name: '教程', slug: 'tutorial' } })

  // === Posts ===
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
int* p = arr;  // 等价于 &arr[0]
\`\`\`

---

## const 指针的三种写法

\`\`\`cpp
// 1. 指向常量的指针
const int* p1 = &x;
p1 = &y;   // ✅
// *p1 = 10; // ❌

// 2. 常量指针
int* const p2 = &x;
*p2 = 10;  // ✅
// p2 = &y; // ❌

// 3. 指向常量的常量指针
const int* const p3 = &x;
\`\`\`

记忆口诀：**const 修饰它左边的东西，如果左边没有东西就修饰右边**。

---

## 引用 vs 指针

| 特性 | 指针 | 引用 |
|------|------|------|
| 可为空 | ✅ | ❌ |
| 可重新绑定 | ✅ | ❌ |

\`\`\`cpp
void swap(int& a, int& b) {
    int t = a; a = b; b = t;
}
\`\`\`

函数的输入参数用 \`const T&\`，输出参数用 \`T*\`。`,
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
      content: `用 Tailwind CSS 从零搭这个个人网站时，踩了几个坑。

## 1. dark mode 配置

\`\`\`js
// tailwind.config.js
export default {
  darkMode: 'class',
}
\`\`\`

坑点：写 \`dark:\` 前缀时必须保证父元素也设了 dark 样式。

## 2. Grid 的 fr 单位

- 任意值用下划线代替空格：\`[5fr_4fr]\` ✅
- \`md:grid-cols-2\` 会覆盖自定义值

## 3. 好用的 Tailwind 类

- \`line-clamp-2\` — 文本截断
- \`backdrop-blur-md\` — 毛玻璃效果`,
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
      content: '# C++ 入门教程\n\n阿里云大学 C++ 入门教程笔记。',
      publishedAt: new Date('2026-07-21'),
      tags: { connect: [{ slug: 'cpp' }, { slug: 'tutorial' }] },
    },
  })

  // === Projects ===
  await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '个人网站',
      description: 'Vite + Tailwind CSS + 原生 JS 构建的个人网站，含博客系统、暗色模式、响应式布局',
      links: [{ label: 'GitHub', url: 'https://github.com/sishui945/my-portfolio' }],
      status: 'building',
    },
  })

  await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'BMP 解析器',
      description: 'C++ BMP 图片解析器，支持读取文件头、信息头、像素数据，输出 PPM 格式',
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
      links: [{ label: 'B站', url: 'https://space.bilibili.com/1909585735' }],
      status: 'done',
    },
  })

  await prisma.project.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'mcmod 传送石',
      description: 'Fabric 1.20+ Minecraft Mod，自定义方块+物品+传送功能',
      links: [],
      status: 'experiment',
    },
  })

  console.log('Seed completed: 3 posts, 5 tags, 4 projects')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

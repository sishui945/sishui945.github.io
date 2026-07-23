import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

function loadMd(filename: string): string {
  return readFileSync(resolve(__dirname, '../../blog/posts', filename), 'utf-8')
}

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
    update: { content: loadMd('cpp/cpp-pointer-reference.md') },
    create: {
      title: 'C++ 指针与引用总结',
      slug: 'cpp-pointer-reference',
      excerpt: '整理了 C/C++ 指针的核心概念：指针运算、数组与指针的关系、const 指针的三种写法区别。',
      content: loadMd('cpp/cpp-pointer-reference.md'),
      publishedAt: new Date('2026-07-20'),
      tags: { connect: [{ slug: 'cpp' }, { slug: 'study-notes' }] },
    },
  })

  await prisma.post.upsert({
    where: { slug: 'tailwind-pitfalls' },
    update: { content: loadMd('css/tailwind-pitfalls.md') },
    create: {
      title: 'Tailwind CSS 踩坑记录',
      slug: 'tailwind-pitfalls',
      excerpt: '从零搭建个人网站时遇到的一些 Tailwind 坑：dark mode 配置、Grid 的 fr 单位、class 优先级覆盖问题。',
      content: loadMd('css/tailwind-pitfalls.md'),
      publishedAt: new Date('2026-07-18'),
      tags: { connect: [{ slug: 'css' }, { slug: 'learning-by-doing' }] },
    },
  })

  await prisma.post.upsert({
    where: { slug: 'cpp-tutorial-aliyun' },
    update: { content: loadMd('cpp/cpp-tutorial-aliyun.md') },
    create: {
      title: 'C++ 入门教程（41课时） - 阿里云大学',
      slug: 'cpp-tutorial-aliyun',
      excerpt: 'C++教程',
      content: loadMd('cpp/cpp-tutorial-aliyun.md'),
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

  await syncTutorials(prisma)

  console.log('Seed completed: 3 posts, 5 tags, 4 projects, 1 tutorial, 2 chapters')
}

const TUTORIALS_DIR = resolve(__dirname, '../../tutorials')

function chapterSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d+-/, '')
}

function orderFromFilename(filename: string): number {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function scanTutorials() {
  const map = new Map<string, { title: string; category: string; chapters: { order: number; slug: string; title: string; content: string }[] }>()
  if (!existsSync(TUTORIALS_DIR)) return map

  for (const dirName of readdirSync(TUTORIALS_DIR)) {
    const dirPath = join(TUTORIALS_DIR, dirName)
    if (!statSync(dirPath).isDirectory()) continue

    const slug = dirName
    const chapterFiles = readdirSync(dirPath)
      .filter(f => f.endsWith('.md'))
      .sort()

    const chapters = chapterFiles.map(f => {
      const content = readFileSync(join(dirPath, f), 'utf-8')
      const firstLine = content.trim().split('\n')[0] || ''
      const title = (firstLine.startsWith('# ') ? firstLine.replace(/^#\s+/, '').trim() : chapterSlugFromFilename(f)) || '未命名章节'
      const order = orderFromFilename(f)
      return { order, slug: chapterSlugFromFilename(f), title, content }
    })

    // 校验 slug 唯一性
    const slugs = chapters.map(c => c.slug)
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
    if (dupes.length > 0) throw new Error(`教程 "${slug}" 中章节 slug 重复: ${dupes.join(', ')}`)

    // 校验 order 唯一性
    const orders = chapters.map(c => c.order)
    const orderDupes = orders.filter((o, i) => orders.indexOf(o) !== i)
    if (orderDupes.length > 0) throw new Error(`教程 "${slug}" 中章节序号重复: ${orderDupes.join(', ')}`)

    map.set(slug, { title: slug, category: 'uncategorized', chapters })
  }
  return map
}

async function syncTutorials(prisma: PrismaClient) {
  const data = scanTutorials()

  for (const [slug, info] of data) {
    // 确保默认分类存在
    const category = await prisma.category.upsert({
      where: { slug: info.category },
      update: {},
      create: { name: info.category, slug: info.category },
    })

    // upsert 教程
    const tutorial = await prisma.tutorial.upsert({
      where: { slug },
      update: { title: info.title, categoryId: category.id },
      create: { title: info.title, slug, description: null, categoryId: category.id },
    })
    // 清空旧章节，重新创建（自动处理孤儿记录）
    await prisma.chapter.deleteMany({ where: { tutorialId: tutorial.id } })

    for (const ch of info.chapters) {
      await prisma.chapter.create({
        data: {
          title: ch.title,
          slug: ch.slug,
          content: ch.content,
          order: ch.order,
          tutorial: { connect: { id: tutorial.id } },
        },
      })
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

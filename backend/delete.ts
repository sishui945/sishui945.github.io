import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) })

const [type, slug] = process.argv.slice(2)

async function main() {
  if (!type || !slug) {
    console.log('用法: npx tsx delete.ts <type> <slug>')
    console.log('  type: post | tutorial | project | tag')
    console.log('  slug: 要删除的记录的 slug（project 用 id）')
    console.log()
    console.log('示例:')
    console.log('  npx tsx delete.ts post cpp-fundation')
    console.log('  npx tsx delete.ts tutorial cpp')
    console.log('  npx tsx delete.ts project 1')
    console.log('  npx tsx delete.ts tag tutorial')
    process.exit(1)
  }

  try {
    switch (type) {
      case 'post':
        await prisma.post.delete({ where: { slug } })
        console.log(`已删除文章: ${slug}`)
        break
      case 'tutorial':
        await prisma.tutorial.delete({ where: { slug } })
        console.log(`已删除教程: ${slug}`)
        break
      case 'project':
        await prisma.project.delete({ where: { id: parseInt(slug) } })
        console.log(`已删除项目: ${slug}`)
        break
      case 'tag':
        await prisma.tag.delete({ where: { slug } })
        console.log(`已删除标签: ${slug}`)
        break
      default:
        console.log(`未知类型: ${type}，可选: post | tutorial | project | tag`)
        process.exit(1)
    }
  } catch (e: any) {
    if (e.code === 'P2025') {
      console.log(`未找到记录: ${type} "${slug}"`)
    } else {
      throw e
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

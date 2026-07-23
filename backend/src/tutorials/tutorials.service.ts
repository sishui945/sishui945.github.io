import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TutorialsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByCategory(categorySlug?: string) {
    return this.prisma.tutorial.findMany({
      where: categorySlug ? { category: { slug: categorySlug } } : undefined,
      include: { category: true, chapters: { orderBy: { order: 'asc' } } },
      orderBy: { publishedAt: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    const tutorial = await this.prisma.tutorial.findUnique({
      where: { slug },
      include: {
        category: true,
        chapters: { orderBy: { order: 'asc' }, select: { id: true, title: true, slug: true, order: true } },
      },
    })
    if (!tutorial) throw new HttpException('教程未找到', HttpStatus.NOT_FOUND)
    return tutorial
  }

  async findChapter(tutorialSlug: string, chapterSlug: string) {
    const tutorial = await this.prisma.tutorial.findUnique({ where: { slug: tutorialSlug } })
    if (!tutorial) throw new HttpException('教程未找到', HttpStatus.NOT_FOUND)
    const chapter = await this.prisma.chapter.findUnique({
      where: { tutorialId_slug: { tutorialId: tutorial.id, slug: chapterSlug } },
      include: {
        tutorial: { include: { chapters: { orderBy: { order: 'asc' }, select: { id: true, title: true, slug: true, order: true } } } },
      },
    })
    if (!chapter) throw new HttpException('章节未找到', HttpStatus.NOT_FOUND)
    return chapter
  }

  async findFirstChapter(tutorialSlug: string) {
    const tutorial = await this.prisma.tutorial.findUnique({ where: { slug: tutorialSlug } })
    if (!tutorial) throw new HttpException('教程未找到', HttpStatus.NOT_FOUND)
    const chapter = await this.prisma.chapter.findFirst({
      where: { tutorialId: tutorial.id },
      orderBy: { order: 'asc' },
    })
    if (!chapter) throw new HttpException('该教程暂无章节', HttpStatus.NOT_FOUND)
    return chapter
  }
}

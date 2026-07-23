import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TutorialsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByCategory(categorySlug?: string) {
    return this.prisma.tutorial.findMany({
      where: categorySlug ? { category: { slug: categorySlug } } : undefined,
      include: {
        category: { select: { name: true, slug: true } },
        chapters: { select: { id: true, title: true, slug: true, order: true }, orderBy: { order: 'asc' } },
      },
      orderBy: { publishedAt: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    return this.prisma.tutorial.findUnique({
      where: { slug },
      include: {
        category: true,
        chapters: { orderBy: { order: 'asc' }, select: { id: true, title: true, slug: true, order: true } },
      },
    })
  }

  async findChapter(tutorialSlug: string, chapterSlug: string) {
    return this.prisma.chapter.findFirst({
      where: { slug: chapterSlug, tutorial: { slug: tutorialSlug } },
      include: {
        tutorial: { include: { chapters: { orderBy: { order: 'asc' }, select: { id: true, title: true, slug: true, order: true } } } },
      },
    })
  }

  async findFirstChapter(tutorialSlug: string) {
    return this.prisma.chapter.findFirst({
      where: { tutorial: { slug: tutorialSlug } },
      orderBy: { order: 'asc' },
    })
  }
}

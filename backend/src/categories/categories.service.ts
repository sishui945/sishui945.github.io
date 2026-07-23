import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CategoriesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findTree() {
    const chaptersSelect = { select: { id: true, title: true, slug: true, order: true }, orderBy: { order: 'asc' as const } }
    const tutorialsWithChapters = { include: { chapters: chaptersSelect }, orderBy: { publishedAt: 'desc' as const } }
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: { include: { tutorials: tutorialsWithChapters } },
            tutorials: tutorialsWithChapters,
          },
        },
        tutorials: tutorialsWithChapters,
      },
    })
  }
}

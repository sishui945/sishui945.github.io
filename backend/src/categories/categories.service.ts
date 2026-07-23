import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CategoriesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findTree() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true,
            tutorials: { orderBy: { publishedAt: 'desc' } },
          },
        },
        tutorials: { orderBy: { publishedAt: 'desc' } },
      },
    })
  }
}

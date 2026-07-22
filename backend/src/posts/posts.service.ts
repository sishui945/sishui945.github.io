import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tag?: string) {
    const where = tag ? { tags: { some: { slug: tag } } } : {}
    return this.prisma.post.findMany({
      where,
      select: {
        id: true, title: true, slug: true, excerpt: true,
        publishedAt: true,
        tags: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: { tags: { select: { name: true, slug: true } } },
    })
  }
}

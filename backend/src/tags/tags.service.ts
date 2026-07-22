import { Injectable, Inject } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
@Injectable()
export class TagsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  findAll() {
    return this.prisma.tag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    })
  }
}

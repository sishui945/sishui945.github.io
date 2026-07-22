import { Injectable, Inject } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
@Injectable()
export class ProjectsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  }
}

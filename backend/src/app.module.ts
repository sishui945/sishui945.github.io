import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PostsModule } from './posts/posts.module'
import { TagsModule } from './tags/tags.module'
import { ProjectsModule } from './projects/projects.module'

@Module({
  imports: [PrismaModule, PostsModule, TagsModule, ProjectsModule],
})
export class AppModule {}

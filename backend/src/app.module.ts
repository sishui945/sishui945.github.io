import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PostsModule } from './posts/posts.module'
import { TagsModule } from './tags/tags.module'
import { ProjectsModule } from './projects/projects.module'
import { CategoriesModule } from './categories/categories.module'
import { TutorialsModule } from './tutorials/tutorials.module'

@Module({
  imports: [PrismaModule, PostsModule, TagsModule, ProjectsModule, CategoriesModule, TutorialsModule],
})
export class AppModule {}

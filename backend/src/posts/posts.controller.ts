import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { PostsService } from './posts.service'
import { QueryPostsDto } from './dto/query-posts.dto'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @ApiQuery({ name: 'tag', required: false, description: '按标签 slug 筛选' })
  findAll(@Query() query: QueryPostsDto) {
    return this.postsService.findAll(query.tag)
  }

  @Get(':slug')
  @ApiOperation({ summary: '获取单篇文章' })
  async findOne(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug)
    if (!post) throw new NotFoundException(`Post "${slug}" not found`)
    return post
  }
}

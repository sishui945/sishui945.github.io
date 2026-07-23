import { Controller, Get, Inject, NotFoundException, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { TutorialsService } from './tutorials.service'
import { QueryTutorialsDto } from './dto/query-tutorials.dto'

@ApiTags('tutorials')
@Controller('tutorials')
export class TutorialsController {
  constructor(@Inject(TutorialsService) private readonly service: TutorialsService) {}

  @Get()
  @ApiOperation({ summary: '教程列表' })
  @ApiQuery({ name: 'category', required: false })
  async findAll(@Query() query: QueryTutorialsDto) {
    return this.service.findByCategory(query.category)
  }

  @Get(':slug')
  @ApiOperation({ summary: '教程详情（含章节列表）' })
  async findOne(@Param('slug') slug: string) {
    const tutorial = await this.service.findBySlug(slug)
    if (!tutorial) throw new NotFoundException(`Tutorial "${slug}" not found`)
    return tutorial
  }

  @Get(':slug/chapters/first')
  @ApiOperation({ summary: '获取教程第一章' })
  async findFirst(@Param('slug') slug: string) {
    const t = await this.service.findBySlug(slug)
    if (!t) throw new NotFoundException(`Tutorial "${slug}" not found`)
    const chapter = await this.service.findFirstChapter(slug)
    if (!chapter) throw new NotFoundException('该教程暂无章节')
    return chapter
  }

  @Get(':slug/chapters/:chapterSlug')
  @ApiOperation({ summary: '章节详情（含 content）' })
  async findChapter(@Param('slug') slug: string, @Param('chapterSlug') chapterSlug: string) {
    const chapter = await this.service.findChapter(slug, chapterSlug)
    if (!chapter) throw new NotFoundException(`Chapter "${chapterSlug}" not found`)
    return chapter
  }
}

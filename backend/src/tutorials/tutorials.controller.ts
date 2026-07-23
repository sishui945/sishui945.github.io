import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { TutorialsService } from './tutorials.service'

@ApiTags('tutorials')
@Controller('tutorials')
export class TutorialsController {
  constructor(@Inject(TutorialsService) private readonly service: TutorialsService) {}

  @Get()
  @ApiOperation({ summary: '教程列表' })
  @ApiQuery({ name: 'category', required: false })
  async findAll(@Query('category') category?: string) {
    return this.service.findByCategory(category)
  }

  @Get(':slug')
  @ApiOperation({ summary: '教程详情（含章节列表）' })
  async findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug)
  }

  @Get(':slug/chapters/first')
  @ApiOperation({ summary: '获取教程第一章' })
  async findFirst(@Param('slug') slug: string) {
    return this.service.findFirstChapter(slug)
  }

  @Get(':slug/chapters/:chapterSlug')
  @ApiOperation({ summary: '章节详情（含 content）' })
  async findChapter(@Param('slug') slug: string, @Param('chapterSlug') chapterSlug: string) {
    return this.service.findChapter(slug, chapterSlug)
  }
}

import { Controller, Get, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { TagsService } from './tags.service'
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(@Inject(TagsService) private readonly tagsService: TagsService) {}
  @Get()
  @ApiOperation({ summary: '获取所有标签及文章计数' })
  findAll() { return this.tagsService.findAll() }
}

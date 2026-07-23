import { Controller, Get, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(@Inject(CategoriesService) private readonly service: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '获取分类树（含子分类和教程）' })
  async findTree() {
    return this.service.findTree()
  }
}

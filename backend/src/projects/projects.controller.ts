import { Controller, Get, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(@Inject(ProjectsService) private readonly projectsService: ProjectsService) {}
  @Get()
  @ApiOperation({ summary: '获取项目列表' })
  findAll() { return this.projectsService.findAll() }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { localeSchema } from '@repo/contracts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  AdminListQueryDto,
  CreateProjectDto,
  ListProjectsQueryDto,
  UpdateProjectDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
@UseInterceptors(PublicCacheInterceptor)
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findPublic(@Query() query: ListProjectsQueryDto) {
    return this.projects.findPublic(query);
  }

  @Get('slugs/:locale')
  slugs(@Param('locale') locale: string) {
    return this.projects.slugsByLocale(localeSchema.parse(locale));
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.projects.findPublicBySlug(slug);
  }
}

@ApiTags('projects')
@Controller('admin/projects')
@UseGuards(JwtAuthGuard)
export class AdminProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findAll(@Query() query: AdminListQueryDto) {
    return this.projects.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.projects.findById(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    return this.projects.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projects.remove(id);
  }
}

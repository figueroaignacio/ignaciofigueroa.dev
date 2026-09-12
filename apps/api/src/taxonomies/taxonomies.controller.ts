import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateProjectCategoryDto,
  CreateProjectLabelDto,
  UpdateProjectCategoryDto,
  UpdateProjectLabelDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { TaxonomiesService } from './taxonomies.service';

@ApiTags('taxonomies')
@Controller('project-categories')
@UseInterceptors(PublicCacheInterceptor)
export class ProjectCategoriesController {
  constructor(private readonly taxonomies: TaxonomiesService) {}

  @Get()
  findAll() {
    return this.taxonomies.findCategories();
  }
}

@ApiTags('taxonomies')
@Controller('project-labels')
@UseInterceptors(PublicCacheInterceptor)
export class ProjectLabelsController {
  constructor(private readonly taxonomies: TaxonomiesService) {}

  @Get()
  findAll() {
    return this.taxonomies.findLabels();
  }
}

@ApiTags('taxonomies')
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminTaxonomiesController {
  constructor(private readonly taxonomies: TaxonomiesService) {}

  @Get('project-categories')
  findCategories() {
    return this.taxonomies.findCategories();
  }

  @Post('project-categories')
  createCategory(@Body() dto: CreateProjectCategoryDto) {
    return this.taxonomies.createCategory(dto);
  }

  @Patch('project-categories/:id')
  updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectCategoryDto) {
    return this.taxonomies.updateCategory(id, dto);
  }

  @Delete('project-categories/:id')
  removeCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.taxonomies.removeCategory(id);
  }

  @Get('project-labels')
  findLabels() {
    return this.taxonomies.findLabels();
  }

  @Post('project-labels')
  createLabel(@Body() dto: CreateProjectLabelDto) {
    return this.taxonomies.createLabel(dto);
  }

  @Patch('project-labels/:id')
  updateLabel(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectLabelDto) {
    return this.taxonomies.updateLabel(id, dto);
  }

  @Delete('project-labels/:id')
  removeLabel(@Param('id', ParseUUIDPipe) id: string) {
    return this.taxonomies.removeLabel(id);
  }
}

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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  AdminListQueryDto,
  CreateExperienceDto,
  LocaleQueryDto,
  UpdateExperienceDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { ExperiencesService } from './experiences.service';

@ApiTags('experiences')
@Controller('experiences')
@UseInterceptors(PublicCacheInterceptor)
export class ExperiencesController {
  constructor(private readonly experiences: ExperiencesService) {}

  @Get()
  findPublic(@Query() query: LocaleQueryDto) {
    return this.experiences.findPublic(query.locale);
  }
}

@ApiTags('experiences')
@Controller('admin/experiences')
@UseGuards(JwtAuthGuard)
export class AdminExperiencesController {
  constructor(private readonly experiences: ExperiencesService) {}

  @Get()
  findAll(@Query() query: AdminListQueryDto) {
    return this.experiences.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.experiences.findById(id);
  }

  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experiences.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiences.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.experiences.remove(id);
  }
}

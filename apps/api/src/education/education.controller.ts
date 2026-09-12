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
  CreateEducationDto,
  LocaleQueryDto,
  UpdateEducationDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { EducationService } from './education.service';

@ApiTags('education')
@Controller('education')
@UseInterceptors(PublicCacheInterceptor)
export class EducationController {
  constructor(private readonly education: EducationService) {}

  @Get()
  findPublic(@Query() query: LocaleQueryDto) {
    return this.education.findPublic(query.locale);
  }
}

@ApiTags('education')
@Controller('admin/education')
@UseGuards(JwtAuthGuard)
export class AdminEducationController {
  constructor(private readonly education: EducationService) {}

  @Get()
  findAll(@Query() query: AdminListQueryDto) {
    return this.education.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.education.findById(id);
  }

  @Post()
  create(@Body() dto: CreateEducationDto) {
    return this.education.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateEducationDto) {
    return this.education.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.education.remove(id);
  }
}

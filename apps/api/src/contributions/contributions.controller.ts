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
  CreateContributionDto,
  LocaleQueryDto,
  UpdateContributionDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { ContributionsService } from './contributions.service';

@ApiTags('contributions')
@Controller('contributions')
@UseInterceptors(PublicCacheInterceptor)
export class ContributionsController {
  constructor(private readonly contributions: ContributionsService) {}

  @Get()
  findPublic(@Query() query: LocaleQueryDto) {
    return this.contributions.findPublic(query.locale);
  }
}

@ApiTags('contributions')
@Controller('admin/contributions')
@UseGuards(JwtAuthGuard)
export class AdminContributionsController {
  constructor(private readonly contributions: ContributionsService) {}

  @Get()
  findAll(@Query() query: AdminListQueryDto) {
    return this.contributions.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.contributions.findById(id);
  }

  @Post()
  create(@Body() dto: CreateContributionDto) {
    return this.contributions.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateContributionDto) {
    return this.contributions.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.contributions.remove(id);
  }
}

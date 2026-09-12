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
  CreateTestimonialDto,
  LocaleQueryDto,
  UpdateTestimonialDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { TestimonialsService } from './testimonials.service';

@ApiTags('testimonials')
@Controller('testimonials')
@UseInterceptors(PublicCacheInterceptor)
export class TestimonialsController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Get()
  findPublic(@Query() query: LocaleQueryDto) {
    return this.testimonials.findPublic(query.locale);
  }
}

@ApiTags('testimonials')
@Controller('admin/testimonials')
@UseGuards(JwtAuthGuard)
export class AdminTestimonialsController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Get()
  findAll(@Query() query: AdminListQueryDto) {
    return this.testimonials.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonials.findById(id);
  }

  @Post()
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonials.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonials.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonials.remove(id);
  }
}

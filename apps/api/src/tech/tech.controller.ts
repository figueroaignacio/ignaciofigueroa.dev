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
  CreateTechIconDto,
  CreateTechStackDto,
  UpdateTechIconDto,
  UpdateTechStackDto,
} from '../common/dto';
import { PublicCacheInterceptor } from '../common/public-cache.interceptor';
import { TechService } from './tech.service';

@ApiTags('tech')
@Controller('tech-stack')
@UseInterceptors(PublicCacheInterceptor)
export class TechStackController {
  constructor(private readonly tech: TechService) {}

  @Get()
  findAll() {
    return this.tech.findStack();
  }
}

@ApiTags('tech')
@Controller('tech-icons')
@UseInterceptors(PublicCacheInterceptor)
export class TechIconsController {
  constructor(private readonly tech: TechService) {}

  @Get()
  findAll() {
    return this.tech.findIcons();
  }
}

@ApiTags('tech')
@Controller('admin/tech')
@UseGuards(JwtAuthGuard)
export class AdminTechController {
  constructor(private readonly tech: TechService) {}

  @Get('stack')
  findStack() {
    return this.tech.findStack();
  }

  @Post('stack')
  createTech(@Body() dto: CreateTechStackDto) {
    return this.tech.createTech(dto);
  }

  @Patch('stack/:id')
  updateTech(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTechStackDto) {
    return this.tech.updateTech(id, dto);
  }

  @Delete('stack/:id')
  removeTech(@Param('id', ParseUUIDPipe) id: string) {
    return this.tech.removeTech(id);
  }

  @Get('icons')
  findIcons() {
    return this.tech.findIcons();
  }

  @Post('icons')
  createIcon(@Body() dto: CreateTechIconDto) {
    return this.tech.createIcon(dto);
  }

  @Patch('icons/:id')
  updateIcon(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTechIconDto) {
    return this.tech.updateIcon(id, dto);
  }

  @Delete('icons/:id')
  removeIcon(@Param('id', ParseUUIDPipe) id: string) {
    return this.tech.removeIcon(id);
  }
}

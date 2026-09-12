import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MEDIA_MAX_BYTES } from '@repo/contracts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateMediaDto } from '../common/dto';
import { type IncomingFile, MediaService } from './media.service';

@ApiTags('media')
@Controller('admin/media')
@UseGuards(JwtAuthGuard)
export class AdminMediaController {
  constructor(private readonly media: MediaService) {}

  @Get()
  findAll() {
    return this.media.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.media.findById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        alt: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MEDIA_MAX_BYTES } }))
  upload(@UploadedFile() file: IncomingFile | undefined, @Body('alt') alt?: string) {
    if (!file) throw new BadRequestException('Missing file');
    return this.media.upload(file, alt ?? '');
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMediaDto) {
    return this.media.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.media.remove(id);
  }
}

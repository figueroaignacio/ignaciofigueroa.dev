import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import {
  ChatRequestDto,
  ChatStreamQueryDto,
  LocaleOnlyQueryDto,
  SummarizeRequestDto,
} from '../common/dto';
import { AssistantService } from './assistant.service';

const STREAM_HEADERS = {
  'X-Accel-Buffering': 'no',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
};

@ApiTags('assistant')
@Controller()
export class AssistantController {
  constructor(private readonly assistant: AssistantService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async chat(
    @Body() body: ChatRequestDto,
    @Query() query: ChatStreamQueryDto,
    @Res() res: Response,
  ) {
    const events = query.stream === 'events';
    res.writeHead(200, {
      ...STREAM_HEADERS,
      'Content-Type': events ? 'application/x-ndjson' : 'text/plain; charset=utf-8',
    });

    try {
      for await (const event of this.assistant.chat(body)) {
        if (events) res.write(`${JSON.stringify(event)}\n`);
        else if (event.type === 'text') res.write(event.delta);
      }
    } catch (error) {
      res.write(events ? `${JSON.stringify({ type: 'error' })}\n` : '');
      throw error;
    } finally {
      res.end();
    }
  }

  @Get('portfolio/projects')
  projects(@Query() query: LocaleOnlyQueryDto) {
    return this.assistant.publicProjects(query.locale);
  }

  @Get('portfolio/experience')
  experience(@Query() query: LocaleOnlyQueryDto) {
    return this.assistant.publicExperience(query.locale);
  }

  @Post('portfolio/summarize')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async summarize(@Body() body: SummarizeRequestDto) {
    return { summary: await this.assistant.summarize(body.body, body.locale) };
  }
}

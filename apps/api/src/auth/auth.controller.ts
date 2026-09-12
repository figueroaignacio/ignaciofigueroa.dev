import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { CookieOptions, Response } from 'express';
import { LoginDto } from '../common/dto';
import type { Env } from '../config/env';
import { AuthService } from './auth.service';
import type { AuthUser } from './auth.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.auth.validateCredentials(dto.email, dto.password);
    const token = await this.auth.signToken(user);
    res.cookie(this.cookieName, token, this.cookieOptions());
    return { user, redirectTo: '/admin' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.cookieName, this.cookieOptions(true));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return { user };
  }

  private get cookieName() {
    return this.config.get('COOKIE_NAME', { infer: true });
  }

  private cookieOptions(clearing = false): CookieOptions {
    const isProd = this.config.get('NODE_ENV', { infer: true }) === 'production';
    const domain = this.config.get('COOKIE_DOMAIN', { infer: true });
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      ...(domain ? { domain } : {}),
      ...(clearing ? {} : { maxAge: 7 * 24 * 60 * 60 * 1000 }),
    };
  }
}

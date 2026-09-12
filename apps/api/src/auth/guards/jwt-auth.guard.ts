import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { Env } from '../../config/env';
import { AuthService } from '../auth.service';
import type { AuthUser, JwtPayload } from '../auth.types';

export type AuthenticatedRequest = Request & { user: AuthUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Env, true>,
    private readonly auth: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('Not authenticated');

    let payload: JwtPayload;
    try {
      payload = await this.jwt.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }

    const user = await this.auth.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User no longer exists');

    req.user = user;
    return true;
  }

  private extractToken(req: Request): string | undefined {
    const cookieName = this.config.get('COOKIE_NAME', { infer: true });
    const cookies = (req as unknown as { cookies?: Record<string, unknown> }).cookies;
    const fromCookie: unknown = cookies?.[cookieName];
    if (typeof fromCookie === 'string' && fromCookie) return fromCookie;

    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) return header.slice(7);
    return undefined;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Database, eq, users } from '@repo/db';
import { compare } from 'bcryptjs';
import { InjectDb } from '../db/inject-db.decorator';
import type { AuthUser, JwtPayload } from './auth.types';

const DUMMY_HASH = '$2a$12$CwTycUXWue0Thq9StjUM0uJ8Y0K1i2v7Zx0Lq7Rk6KzYh1oQ6f4wS';

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: Database,
    private readonly jwt: JwtService,
  ) {}

  async validateCredentials(email: string, password: string): Promise<AuthUser> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase().trim()),
    });
    const ok = await compare(password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException('Invalid email or password');
    return this.toAuthUser(user);
  }

  signToken(user: AuthUser): Promise<string> {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    return this.jwt.signAsync(payload);
  }

  async findById(id: string): Promise<AuthUser | null> {
    const user = await this.db.query.users.findFirst({ where: eq(users.id, id) });
    return user ? this.toAuthUser(user) : null;
  }

  private toAuthUser(user: { id: string; email: string; name: string | null; role: 'admin' }) {
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}

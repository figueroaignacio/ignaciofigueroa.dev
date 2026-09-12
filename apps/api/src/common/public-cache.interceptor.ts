import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PublicCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>();
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=900');
      }),
    );
  }
}

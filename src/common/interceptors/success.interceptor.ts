import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        path: context.switchToHttp().getRequest().url,
        timestamp: new Date().toISOString(),
        method: context.switchToHttp().getRequest().method,
        statusCode: context.switchToHttp().getResponse().statusCode,
        response: typeof data === 'string' ? { message: data } : data,
      })),
    );
  }
}

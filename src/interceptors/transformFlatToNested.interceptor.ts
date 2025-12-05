import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TransformFlatToNestedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body && typeof request.body === 'object') {
      request.body = this.flattenToNested(request.body);
    }

    return next.handle();
  }

  private flattenToNested(flat: Record<string, any>): any {
    const nested: Record<string, any> = {};

    for (const flatKey in flat) {
      //  Safe key check
      if (!Object.prototype.hasOwnProperty.call(flat, flatKey)) continue;

      const pathParts = flatKey.split('.');
      let current = nested;

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];

        // Match something like "heroSection[0]"
        const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

        if (arrayMatch) {
          const [, arrName, indexStr] = arrayMatch;
          const index = parseInt(indexStr, 10);

          if (!current[arrName]) current[arrName] = [];
          if (!current[arrName][index]) current[arrName][index] = {};

          current = current[arrName][index];
        } else {
          // Last part → assign the actual value
          if (i === pathParts.length - 1) {
            current[part] = flat[flatKey];
          } else {
            if (!current[part]) current[part] = {};
            current = current[part];
          }
        }
      }
    }

    return nested;
  }
}

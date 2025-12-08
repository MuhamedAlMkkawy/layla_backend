import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FlatToNestedWithFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body, files } = request;

    if (body && typeof body === 'object') {
      // Step 1: Convert flat dot-notation to nested objects
      request.body = this.flattenToNested(body);

      // Step 2: Merge uploaded files into the nested body
      if (files?.length) {
        request.body = this.mergeFilesIntoBody(request.body, files);
      }
    }

    return next.handle();
  }

  private flattenToNested(flat: Record<string, any>): any {
    const nested: Record<string, any> = {};

    for (const flatKey in flat) {
      if (!Object.prototype.hasOwnProperty.call(flat, flatKey)) continue;

      const pathParts = flatKey.split('.');
      let current = nested;

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

        if (arrayMatch) {
          const [, arrName, indexStr] = arrayMatch;
          const index = parseInt(indexStr, 10);

          if (!current[arrName]) current[arrName] = [];
          if (!current[arrName][index]) current[arrName][index] = {};

          current = current[arrName][index];
        } else {
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

  private mergeFilesIntoBody(body: any, files: Express.Multer.File[]) {
    files.forEach((file) => {
      const fieldPath = file.fieldname; // e.g. "main_slider[0].image"
      const value = `/uploads/${file.filename}`;

      const pathParts = fieldPath
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);

      let current = body;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];

        if (/^\d+$/.test(pathParts[i + 1])) {
          if (!Array.isArray(current[key])) current[key] = [];
          if (!current[key][+pathParts[i + 1]]) current[key][+pathParts[i + 1]] = {};
        } else {
          if (!current[key]) current[key] = {};
        }

        current = current[key];
      }

      const lastKey = pathParts[pathParts.length - 1];
      current[lastKey] = value; // Assign file path
    });

    return body;
  }
}

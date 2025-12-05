import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
  
@Injectable()
export class MergeFileFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { body, files } = request;
    if (body && files?.length) {
      request.body = this.mergeFileFieldsIntoBody(body, files);
    }

    return next.handle();
  }

  private mergeFileFieldsIntoBody(body: any, files: Express.Multer.File[]) {
    files.forEach((file) => {
      const fieldPath = file.fieldname; // e.g. "heroSection[0].image"
      const value = `/uploads/${file.filename}`;

      // heroSection[0].image → ['heroSection', '0', 'image']
      const pathParts = fieldPath
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);

      let current = body;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];

        // If next key is a number → ensure array
        if (/^\d+$/.test(pathParts[i + 1])) {
          if (!Array.isArray(current[key])) current[key] = [];
        } else {
          if (!current[key]) current[key] = {};
        }

        current = current[key];
      }

      current[pathParts[pathParts.length - 1]] = value;
    });

    return body;
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Detect language from header (default to 'en')
    const langHeader = request.headers['accept-language'] || 'en';
    const lang = langHeader.toLowerCase().includes('ar') ? 'ar' : 'en';

    // Extract pagination info from query (defaults)
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 15;

    // Messages dictionary
    const messages = {
      en: 'Data sent successfully',
      ar: 'تم إرسال البيانات بنجاح',
    };

    return next.handle().pipe(
      map((data) => {
        // If controller returns { status, message, data } already → skip wrapping
        if (data?.status && data?.data !== undefined) {
          return data;
        }

        // Handle pagination for array data
        if (Array.isArray(data)) {
          const totalItems = data.length;
          const totalPages = Math.ceil(totalItems / limit);
          const start = (page - 1) * limit;
          const end = start + limit;
          const paginatedData = data.slice(start, end);

          return {
            status: 'success',
            message: messages[lang],
            data: paginatedData,
            pagination: {
              total_items: totalItems,
              page,
              limit,
              total_pages: totalPages,
            },
          };
        }

        // If controller returned { message, data } → merge safely
        if (data && typeof data === 'object' && 'message' in data && 'data' in data) {
          return {
            status: 'success',
            message: typeof data.message === 'object'
              ? data.message[lang] || messages[lang]
              : data.message,
            data: data.data ?? undefined,
          };
        }

        // Default fallback for single response values
        return {
          status: 'success',
          message: messages[lang],
          data: data ?? undefined,
        };
      }),
    );
  }
}

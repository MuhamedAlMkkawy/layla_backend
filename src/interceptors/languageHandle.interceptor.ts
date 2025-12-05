import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Get language from query or header (no default now)
    const lang =
      request.query.lang?.toString().toLowerCase() ||
      request.headers['accept-language']?.toString().toLowerCase() ||
      '';

    // If it's a supported language
    const selectedLang = ['ar', 'en'].includes(lang) ? lang : '';

    const localize = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(localize);
      }

      // Skip null, undefined, Date, ObjectId, or primitive values
      if (
        !obj ||
        typeof obj !== 'object' ||
        obj instanceof Date ||
        (obj.constructor && obj.constructor.name === 'ObjectId')
      ) {
        return obj;
      }

      // If no language is selected → return full multilingual object
      if (!selectedLang) return obj;

      // If object has only { en, ar } → return selected language
      const keys = Object.keys(obj);
      if (keys.length === 2 && keys.includes('en') && keys.includes('ar')) {
        return obj[selectedLang] ?? obj['en'];
      }

      // Otherwise, recursively process deeper fields
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (key === '_id') {
          result[key] = value; // Skip touching _id
        } else {
          result[key] = localize(value);
        }
      }
      return result;
    };

    return next.handle().pipe(
      map((response) => {
        if (!response) return response;
        return localize(response);
      }),
    );
  }
}

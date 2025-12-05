import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function Serialize(dto: any) {
  return UseInterceptors(new UniversalSerializer(dto));
}

export class UniversalSerializer implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Auto-detect and transform incoming data
    if (request.body) {
      request.body = this.autoTransformData(request.body, request.headers['content-type']);
    }

    return next.handle().pipe(
      map((data: any) => {
        // Handle arrays, single objects, or paginated responses
        if (Array.isArray(data)) {
          return data.map(item => this.transformItem(item));
        } else if (data?.data && Array.isArray(data.data)) {
          // For paginated responses like { data: [], total: 10 }
          return {
            ...data,
            data: data.data.map(item => this.transformItem(item))
          };
        } else if (data?.items && Array.isArray(data.items)) {
          // For paginated responses like { items: [], count: 10 }
          return {
            ...data,
            items: data.items.map(item => this.transformItem(item))
          };
        } else {
          return this.transformItem(data);
        }
      })
    );
  }

  private transformItem(item: any): any {
    if (!item || typeof item !== 'object') return item;
    
    return plainToClass(this.dto, item, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  private autoTransformData(body: any, contentType: string): any {
    if (!body || typeof body !== 'object') return body;

    // If it's form data, auto-transform common field types
    if (contentType?.includes('multipart/form-data')) {
      return this.transformFormData(body);
    }

    // For JSON data, ensure proper typing
    return this.ensureProperTypes(body);
  }

  private transformFormData(body: any): any {
    const transformed = { ...body };

    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        transformed[key] = this.guessAndTransformType(transformed[key]);
      }
    }

    return transformed;
  }

  private ensureProperTypes(body: any): any {
    const transformed = { ...body };

    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        // Only transform if it's a string that looks like another type
        if (typeof transformed[key] === 'string') {
          transformed[key] = this.guessAndTransformType(transformed[key]);
        }
      }
    }

    return transformed;
  }

  private guessAndTransformType(value: any): any {
    if (value === null || value === undefined) return value;

    // Handle arrays
    if (typeof value === 'string' && value.trim().startsWith('[') && value.trim().endsWith(']')) {
      try {
        return JSON.parse(value);
      } catch {
        // If JSON parsing fails, try comma-separated
        return value.split(',').map(v => this.guessAndTransformType(v.trim()));
      }
    }

    // Handle objects
    if (typeof value === 'string' && value.trim().startsWith('{') && value.trim().endsWith('}')) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    // Handle numbers
    if (!isNaN(Number(value)) && value !== '') {
      return Number(value);
    }

    // Handle booleans
    if (value === 'true' || value === 'false') {
      return value === 'true';
    }

    // Handle null
    if (value === 'null') {
      return null;
    }

    // Handle undefined
    if (value === 'undefined') {
      return undefined;
    }

    return value;
  }
}

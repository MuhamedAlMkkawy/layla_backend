import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const lang = request.headers['accept-language'] || 'en';

    const openRoutes = ['/login', '/signup', '/logout'];
    if (openRoutes.includes(request.path)) return true;

    if (!session || !session.user_token) {
      throw new UnauthorizedException({
        status : 'error' ,
        message: lang === 'ar' ? 'يجب أن تقوم بتسجيل الدخول لتنفيذ هذا الإجراء' : 'You must be logged in to perform this action',
      });
    }

    if (request.method === 'DELETE' && session.role === 1) {
      throw new ForbiddenException({
        status : 'error' ,
        message: lang === 'ar' ? 'ليس لديك صلاحية لتنفيذ هذا الإجراء' : 'You do not have permission to perform this action',
      });
    }
    if (
      (
        request.method === 'POST' || 
        request.method === 'PATCH' || 
        request.path !== '/change_password'
      ) && session.role === 2) {
      throw new ForbiddenException({
        status : 'error' ,
        message: lang === 'ar' ? 'ليس لديك صلاحية لتنفيذ هذا الإجراء' : 'You do not have permission to perform this action',
      });
    }

    return true;
  }
}

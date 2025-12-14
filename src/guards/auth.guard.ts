import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: any): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('AuthGuard - User Token:', request.session.userToken);

    const openRoutes = ['/login', '/signup' , '/change_password'];
    if (openRoutes.some(route => request.path.startsWith(route))) {
      return true;
    }


    return !!request.session.user_token;
  }
}
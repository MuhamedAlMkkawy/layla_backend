import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('auth')
@UseInterceptors(
  AnyFilesInterceptor({
    storage: diskStorage({
      destination: `./uploads`,
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
  FlatToNestedWithFilesInterceptor
)
export class AuthController {
  constructor(private authService : AuthService){}

  // LOGIN
  // SIGNUP
  @Post('/signup')
  async signUp(@Body() body : CreateUserDto) {
    return await this.authService.signup(body)
  }
  // DELETE ACCOUNT
}

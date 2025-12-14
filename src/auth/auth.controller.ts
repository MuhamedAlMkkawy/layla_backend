import { BadRequestException, Body, Controller, Delete, Post, Session, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { SigninDto } from './dtos/Signin';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponseDto } from '../users/dtos/UserResponce.dto';

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

  // SIGNIN
  @Post('/signin')
  @Serialize(UserResponseDto)
  async logIn(@Body() body : SigninDto , @Session() session : any){
    const user = await this.authService.signin(body)

    session.user_token = user.token

    return user
  }



  // SIGNUP
  @Post('/signup')
  @Serialize(UserResponseDto)
  async signUp(@Body() body : CreateUserDto , @Session() session : any) {
    const user = await this.authService.signup(body)

    session.user_token = user.token

    return user
  }



  // Logout
  @Delete('/logout')
  async logout(@Session() session: any) {
    if(!session.user_token){
      throw new BadRequestException('You are Already Logged Out')
    }
    
    delete session.user_token;

    return {
      message: 'Logged Out Successfully',
      data: null
    };
  }
}

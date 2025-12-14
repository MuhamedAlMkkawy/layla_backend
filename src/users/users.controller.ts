import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponseDto } from './dtos/UserResponce.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
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
export class UsersController {
  constructor(private usersService : UsersService){}


  // Get All Users
  @Get()
  @Serialize(UserResponseDto)
  async getAllUsers () {
    return await this.usersService.getAllUsers()
  }


  
  // Get Single User
  @Get('/:id')
  @Serialize(UserResponseDto)
  async getUser(@Param('id' , ParseIntPipe) id : number){
    return await this.usersService.findUserByID(id)
  }



  // Update User Data
  @Patch('/:id')
  @Serialize(UserResponseDto)
  async updateUser(@Param('id' , ParseIntPipe) id : number , @Body() body : any){
    return await this.usersService.updateUser(id , body)
  }



  // Delete User
  @Delete('/:id')
  async deleteUser(@Param('id' , ParseIntPipe) id : number){
    return await this.usersService.deleteUser(id)
  }
}

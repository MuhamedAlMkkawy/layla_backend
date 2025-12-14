import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UserResponseDto } from './dtos/UserResponce.dto';

@Controller('users')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(private usersService : UsersService){}


  // Get All Users
  @Get()
  async getAllUsers () {
    return await this.usersService.getAllUsers()
  }


  
  // Get Single User
  @Get('/:id')
  async getUser(@Param('id' , ParseIntPipe) id : number){
    const users = await this.getAllUsers()

    const userEmail = await users.filter((item) => item.id == id)[0]?.email

    if(!userEmail) throw new NotFoundException('This User isn\'t Found!')
    
    return await this.usersService.findUser(userEmail)
  }



  // Update User Data
  // Delete User
}

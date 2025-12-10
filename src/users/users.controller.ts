import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService : UsersService){}


  // Get All Users
  @Get()
  async getAllUsers () {
    return await this.userService.getAllUsers()
  }


  
  // Get Single User
  // Update User Data
  // Delete User
}

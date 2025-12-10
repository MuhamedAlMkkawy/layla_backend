import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo : Repository<Users>
  ){}

    // Get All Users
    async getAllUsers () {
      const users = await this.usersRepo.find()

      if(!users[0]) throw new NotFoundException('There is No Users Found !!')

      return users
    }
  
  
    
    // Get Single User
    async findUser(email : string){
      const user = await this.usersRepo.findBy({email})

      if(!user) throw new NotFoundException('User Isn\'t Found!')

      return user
    }
    // Create User
    // Update User Data
    // Delete User
}

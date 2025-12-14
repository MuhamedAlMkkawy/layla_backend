import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo : Repository<Users>
  ){}

    // Get All Users
    async getAllUsers () {
      const users = await this.usersRepo.find()
      if(users.length == 0) throw new NotFoundException('There is No Users Found !!')

      return users
    }
  
  
    
    // Get Single User By Email
    async findUserByEmail(email: string) {
      const user =  await this.usersRepo.findOne({
        where: { email },
      }); // returns null if not found

      return user
    }



    // Get Single User By ID
    async findUserByID(id : number){
      const users = await this.getAllUsers()

      const user = users.filter((item)=> item.id == id)

      if(!user[0]) throw new NotFoundException('User isn\'t Found !')

      return user
    }



    // Create User
    async createUser(user : any) {
      const newUser = this.usersRepo.create(user)

      if(!newUser) throw new NotFoundException('The User \'s Data isn\'t Found!')

      return await this.usersRepo.save(newUser)
    }



    // Update User Data
    async updateUser(id : number , data: UpdateUserDto){
      const isUserFound = await this.findUserByID(id)

      if(!isUserFound) throw new NotFoundException('User isn\'t Found !')
      
      await this.usersRepo.update(id , data)
    
      return {
        message : 'User is Updated Successfully',
        data : await this.usersRepo.findBy({id})
      }
    }


    
    // Delete User
    async deleteUser(id : number){
      const isUserFound = await this.findUserByID(id)

      if(!isUserFound) throw new NotFoundException('User isn\'t Found !')      
      
      await this.usersRepo.delete(id)

      return {
        message : 'User is Deleted Successfully',
        data : null
      }
    }
}

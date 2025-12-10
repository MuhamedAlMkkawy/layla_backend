import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


const scrypt = promisify(crypto.scrypt);



@Injectable()
export class AuthService {
  constructor(
    private userService : UsersService ,
    private jwtService : JwtService
  ){}

  // LOGIN
  // SIGNUP
  async signup(body : CreateUserDto){
    const { email, password, confirmPassword , ...rest } = body;

    // 🔍 Check if email already exists
    const userFound = await this.userService.findUser(email);

    if (userFound.length > 0 ) {
      throw new BadRequestException('This email is already used 😡');
    }
    
    
    if(password !== confirmPassword) {
      throw new BadRequestException('Password mismatches with confirm password😡');
    }
    // 🔐 Generate salt and hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const generetedToken =  this.jwtService.sign({email})


    const newUser = {
      ...rest,
      email,
      token : generetedToken,
      password : hashedPassword,
    }
    console.log(newUser)
    // // 🧩 Create new user
    // this.userService.createUser(newUser);

    // return newUser
  }
  // DELETE ACCOUNT
}

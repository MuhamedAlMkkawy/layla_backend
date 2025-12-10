import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6) // Example minimum length, adjust as needed
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(6) // Example minimum length, adjust as needed
  @IsNotEmpty()
  confirmPassword: string;
}

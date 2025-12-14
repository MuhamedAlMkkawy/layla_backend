import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6) // Example minimum length, adjust as needed
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(6) // Example minimum length, adjust as needed
  @IsNotEmpty()
  confirmPassword?: string;
}

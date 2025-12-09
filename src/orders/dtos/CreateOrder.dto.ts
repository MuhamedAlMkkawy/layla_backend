import { IsArray, IsNumber, IsString, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  @IsString()
  fullName: string;

  @IsNumber()
  mainPhoneNumber: number;

  @IsNumber()
  @IsOptional()
  secPhoneNumber: number;

  @IsString()
  governerate: string;

  @IsString()
  city: string;

  @IsString()
  fullAddress: string;
}

export class CreateOrderDto {
  @IsString()
  created_at: string;

  @IsNumber()
  subTotal: number;

  @IsArray()
  @IsString({ each: true })
  products: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user?: UserDto;
}

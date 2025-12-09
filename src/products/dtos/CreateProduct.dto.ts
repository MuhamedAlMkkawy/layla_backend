import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNotEmpty
} from "class-validator";
import { Type } from "class-transformer";
import { ProductColorDto } from "./ProductColor.dto";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  has_discount: boolean;

  @IsNumber()
  discount_price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  rating: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];
}

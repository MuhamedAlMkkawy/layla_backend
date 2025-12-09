import { IsNumber, IsString } from "class-validator";

export class ProductColorDto {
  @IsString()
  color: string;
}



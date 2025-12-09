import { Expose, Type } from "class-transformer";


export class ProductColorDto {
  @Expose()
  id: number;

  @Expose()
  color: string;
}


export class ProductsResponceDto {
  @Expose()
  id: number;
  
  @Expose()
  image: string;
  
  @Expose()
  name: string;

  @Expose()
  best_sale : boolean

  @Expose()
  price: number;

  @Expose()
  has_discount : boolean

  @Expose()
  discount_price : number

  @Expose()
  description: string;


  @Expose()
  category: string;

  @Expose()
  stock: number;

  @Expose()
  rating: number;

  @Expose()
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];
}
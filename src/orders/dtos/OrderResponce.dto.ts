import { Expose, Type } from "class-transformer";


export class OrderProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  best_sale: boolean | null; // Type can be refined if the structure of best_sale is known

  @Expose()
  category: string;

  @Expose()
  rating: number;

  @Expose()
  quantity: number;

  @Expose()
  color : string
}

export class UserResponseDto {
  @Expose()
  fullName: string;

  @Expose()
  mainPhoneNumber: string; // Changed to string based on example " 201234567890"

  @Expose()
  secPhoneNumber: string; // Changed to string based on example " 201234567891"

  @Expose()
  governerate: string;

  @Expose()
  city: string;

  @Expose()
  fullAddress: string;
}

export class OrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  created_at: string;

  @Expose()
  subTotal: string; // Changed to string based on example " 399.99"

  @Expose()
  status: string; // Changed to string based on example " 0"

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  @Type(() => OrderProductResponseDto)
  products: OrderProductResponseDto[];
}

export class OrderFullResponseDto {
  @Expose()
  status: string;

  @Expose()
  message: string;

  @Expose()
  @Type(() => OrderResponseDto)
  data: OrderResponseDto;
}

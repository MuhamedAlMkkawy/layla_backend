import { Expose, Type } from "class-transformer";

export class OrderProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  quantity: number;
}

export class UserResponseDto {
  @Expose()
  fullName: string;

  @Expose()
  mainPhoneNumber: number;

  @Expose()
  secPhoneNumber: number;

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
  subTotal: number;

  @Expose()
  status: number;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  @Type(() => OrderProductResponseDto)
  products: OrderProductResponseDto[];
}

import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  phone: string; 

  @Expose()
  email: string;

  @Expose()
  token?: string;
}

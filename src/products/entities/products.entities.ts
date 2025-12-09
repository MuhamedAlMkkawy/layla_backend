import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  image: string;
  
  @Column()
  name: string;


  @Column()
  price: number;

  @Column()
  has_discount : boolean

  @Column()
  discount_price : number

  @Column()
  description: string;


  @Column()
  category: string;

  @Column()
  stock: number;

  @Column()
  rating: number;

  @Column("simple-json")
  colors : {
    id : number 
    color : string
  }[]

  
}
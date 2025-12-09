import { Products } from "src/products/entities/products.entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id : number

  @Column()
  created_at : string

  @Column()
  subTotal : number

  @Column()
  status : number

  @Column("simple-json" , {nullable : true})
  user : {
    fullName : string,
    mainPhoneNumber : number,
    secPhoneNumber : number,
    governerate : string ,
    city : string,
    fullAddress : string,
  }

  @Column("simple-json")
  products : Products[]
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id : number

  @Column()
  image : string
  
  @Column()
  name : string
  
  @Column()
  phone : string

  @Column()
  email : string

  @Column()
  password : string
}
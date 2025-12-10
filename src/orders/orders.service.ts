import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entities';
import { In, Repository } from 'typeorm';
import { Products } from 'src/products/entities/products.entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepo : Repository<Orders>,

    @InjectRepository(Products)
    private readonly productsRepo : Repository<Products>
  ){}


   // GET ORDERS
    async getAllOrders (){
      const orders = await this.ordersRepo.find();

      if (!orders || orders.length === 0) {
        throw new NotFoundException('No Orders Found!!!');
      }
      
      return orders;

    }



    // GET SINGLE ORDER
    async getSingleOrder(id : number) {
      const order =  await this.ordersRepo.findBy({id})

      if(!order[0]) throw new NotFoundException('This order isn\'t Found')

      return order
    }





    // ADD ORDER
    async addNewOrder(data : any) {
      const productIds = data.products.map(p => Number(p.id));

      const products = await this.productsRepo.find({
        where: { id: In(productIds) }
      });

      if (products.length !== productIds.length) {
        throw new NotFoundException('One or more products not found');
      }


      // Create order with products + quantity
      const ordProducts = products.map(product => {
        const selected = data.products.find(item => Number(item.id) === product.id);
        return {
          ...product,
          quantity: selected ? Number(selected.quantity) : 0,
          color : selected ? selected.color : null
        };
      });

      const order = this.ordersRepo.create({
        status: 0,
        ...data,
        products: ordProducts,
      });

      if(!order) throw new NotFoundException('Order Not Found')

        console.log(order)

      return await this.ordersRepo.save(order)
    } 



  
    // UPDATE ORDER
    // CHANGE ORDER STATUS
    // DELETE ORDER
    async deleteOrder(id : number){
      const order = await this.ordersRepo.findBy({id})

      if(!order) throw new NotFoundException('This Order Isn\'t Found!!!')
        
      await this.ordersRepo.remove(order)

      return {
        message : 'Order Is Deleted Successfully' ,
      }
    }
}

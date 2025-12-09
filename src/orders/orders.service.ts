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

      const productIds = orders
        .flatMap(order => order.products.map(p => Number(p.id))); // collect all product IDs

    console.log(productIds)

      const products = await this.productsRepo.find({
        where: { id: In(productIds) }
      });

      if (products.length === 0) {
        throw new NotFoundException('No related products found');
      }
      // attach product details back to each order
      const ordersWithProducts = orders.map(order => ({
        ...order,
        products: order?.products.map(p => ({
          ...p,
          product: products.find(prod => prod?.id === Number(p?.id)) || null
        }))
      }));

      return ordersWithProducts;

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
      const order = this.ordersRepo.create({
        status: 0,
        ...data,
        products: products.map(product => {
          const selected = data.products.find(item => Number(item.id) === product.id);

          return {
            ...product,
            quantity: selected ? Number(selected.quantity) : 0
          };
        })
      });


      if(!order) throw new NotFoundException('Order Not Found')

      return await this.ordersRepo.save(order)
    } 



  
    // UPDATE ORDER
    // CHANGE ORDER STATUS
    // DELETE ORDER
}

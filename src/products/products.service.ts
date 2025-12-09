import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entities';
import { Repository } from 'typeorm';
import { merge } from 'lodash';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private repo : Repository<Products>
  ){}

  // GET ALL PRODUCTS
  async getAllProducts() {
    const products =  await this.repo.find();

    if(!products) throw new NotFoundException('No products found');

    return products;
  }




  // GET SINGLE PRODUCT
  async getSingleProduct(id : string) {
    const product =  await this.repo.findOne({where : {id : parseInt(id)}});

    if(!product) throw new NotFoundException('Product not found');

    return product;
  }



  // ADD PRODUCT
  async addProduct(data : any){
    const products = this.repo.create(data)

    if(!products) throw new NotFoundException('Product not created');

    return await this.repo.save(products)
  }



  // UPDATE PRODUCT
  async updateProduct(id : string , data : any){
    const product = await this.repo.findOne({where: {id: parseInt(id)}});

    if(!product) throw new NotFoundException('Product not found');

    const updatedProduct = merge({} , product , data)


    return await this.repo.save(updatedProduct)
  }



  // DELETE PRODUCT
  async deleteProduct(id : string){
    const product = await this.repo.findOne({where: {id: parseInt(id)}});

    if(!product) throw new NotFoundException('Product not found');

    await this.repo.remove(product);

    return { 
      message : 'Product deleted successfully' , 
      data : null 
    }
  }
}

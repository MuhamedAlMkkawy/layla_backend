import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entities';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports : [
    TypeOrmModule.forFeature([Orders]) ,
    ProductsModule
  ]
})
export class OrdersModule {}

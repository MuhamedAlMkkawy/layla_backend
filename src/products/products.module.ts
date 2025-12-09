import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports : [TypeOrmModule.forFeature([Products])],
  exports : [TypeOrmModule]
})


export class ProductsModule {}

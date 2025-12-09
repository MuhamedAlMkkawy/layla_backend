import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entities';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports : [TypeOrmModule.forFeature([Home]) , ProductsModule]
})
export class HomeModule {}

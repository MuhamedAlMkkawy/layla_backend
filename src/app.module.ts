import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { Home } from './home/entities/home.entities';
import { ProductsModule } from './products/products.module';
import { Products } from './products/entities/products.entities';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './orders/entities/orders.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true, // only for development
      autoLoadEntities: true,
      entities: [
        Home,
        Products,
        Orders
      ],
    }),
    HomeModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { OrderResponseDto } from './dtos/OrderResponce.dto';

@Controller('orders')
@UseInterceptors(
  AnyFilesInterceptor({
    storage: diskStorage({
      destination: `./uploads`,
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
  FlatToNestedWithFilesInterceptor
)
@Serialize(OrderResponseDto)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService){}

  // GET ORDERS
  @Get()
  async getAllOrders (){
    return await this.ordersService.getAllOrders()
  }



  // GET SINGLE ORDER
  @Get('/:id')
  async getSingleOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.getSingleOrder(id)
  }




  // ADD ORDER
  @Post()
  async addNewOrder(@Body() body : any){
    const validatedData = plainToClass(CreateOrderDto , body)

    return await this.ordersService.addNewOrder(validatedData)
  }



  // CHANGE ORDER STATUS
  @Patch('/:id')
  async updateOrderStatus(@Param('id' , ParseIntPipe) id : number){
    return await this.ordersService.updateOrderStatus(id)
  }
  
  
  // CANCEL ORDER
  @Delete('cancel/:id')
  async cancelOrder(@Param('id' , ParseIntPipe) id : number) {
    return await this.ordersService.cancelOrder(id)
  }


  // DELETE ORDER
  @Delete('/:id')
  async deleteOrder(@Param('id' , ParseIntPipe) id : number) {
    return await this.ordersService.deleteOrder(id)
  }
}

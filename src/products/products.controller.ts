import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { ProductsResponceDto } from './dtos/ProductsResponce.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Controller('products')
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
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  // GET ALL PRODUCTS
  @Get()
  @Serialize(ProductsResponceDto)
  async getAllProudcts() {
    return await this.productsService.getAllProducts();
  }



  // GET SINGLE PRODUCT
  @Get('/:id')
  @Serialize(ProductsResponceDto)
  async getSingleProduct(@Param('id') id : string) {
    return await this.productsService.getSingleProduct(id);
  }



  // ADD PRODUCT
  @Post()
  @Serialize(ProductsResponceDto)
  async addProduct(@Body() body : any){
    const validatedData = plainToClass(CreateProductDto , body)
    
    const products = {
      ...validatedData,
      colors : validatedData.colors.map((color, index) => ({ id: index + 1, ...color }))
    }
    return await this.productsService.addProduct(products)
  }




  // UPDATE PRODUCT
  @Patch('/:id')
  @Serialize(ProductsResponceDto)
  async updateProduct(@Param('id') id : string , @Body() body : any){
    const validatedData = plainToClass(UpdateProductDto , body)

    const updatedProduct = {
      ...validatedData,
      colors : validatedData.colors?.map((color, index) => ({ id: index + 1, ...color }))
    }


    return await this.productsService.updateProduct(id , updatedProduct)
  }



  // DELETE PRODUCT
  @Delete('/:id')
  async deleteProduct(@Param('id') id : string){
    return await this.productsService.deleteProduct(id)
  }
}

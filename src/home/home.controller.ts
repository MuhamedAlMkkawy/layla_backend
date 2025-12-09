import { Body, Controller, Get, Post, Patch , Delete ,  UseInterceptors } from '@nestjs/common';
import { HomeService } from './home.service';
import { plainToClass } from 'class-transformer';
import { CreateHomeDto } from './dtos/CreateHome.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FlatToNestedWithFilesInterceptor } from '../interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { HomeResponseDto } from './dtos/HomeResponce.dto';

@Controller('home')
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
@Serialize(HomeResponseDto)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // GET ALL HOME DATA
  @Get()
  async getHomeData() {
    return this.homeService.getHomeData();
  }


  // CREATE HOME DATA
  @Post()
  async createHomeData(@Body() body : any) {
    const validatedData = plainToClass(CreateHomeDto, body)

    return await this.homeService.createHomeData(validatedData);
  }



  // UPDATE HOME DATA
  @Patch()
  async updateHomeData(@Body() body : any) {
    // const validatedData = plainToClass(UpdateHomeDto, body)
    return await this.homeService.updateHomeData(body);
  }


  // DELETE HOME DATA
  @Delete()
  async deleteHomeData() {
    return this.homeService.deleteHomeData();
  }
}

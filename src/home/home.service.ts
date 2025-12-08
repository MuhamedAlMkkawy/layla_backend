import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entities';
import { Repository } from 'typeorm';
import { merge } from 'lodash';
import { UpdateHomeDto } from './dtos/UpdateHome.dto';



@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) 
    private repo: Repository<Home>
  ){}

  // GET ALL HOME DATA
  async getHomeData () {
    const home = await this.repo.find()

    if(!home){
      throw new NotFoundException('Home Page is\'nt Found!!')
    }

    return home
  }



  // CREATE HOME DATA
  async createHomeData(data : any) {
    const homeData = await this.getHomeData()[0]

    if(homeData) throw new NotFoundException('Home Page is Already Found!!')

    const home = this.repo.create(data)

    if(!home) throw new NotFoundException('Home Page is\'nt Found!!')
  
    return await this.repo.save(home)
  }



  // UPDATE HOME DATA
  async updateHomeData(data : UpdateHomeDto) {
    const homeData = await this.getHomeData()
    if(!homeData[0]) throw new NotFoundException('Home Page is\'nt Found!!')
    
    const newHome = merge({} , homeData[0] , data)

    return await this.repo.save(this.repo.create(newHome))
  }



  // DELETE HOME DATA
  async deleteHomeData () {
    const home =  await this.getHomeData()

    if(!home) throw new NotFoundException('Home Page is\'nt Found!!')

    await this.repo.remove(home)
    return {
      message : 'Home Page is Deleted Successfully!!',
      data : null
    }
  }
}

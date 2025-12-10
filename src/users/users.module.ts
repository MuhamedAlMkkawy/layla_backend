import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [TypeOrmModule.forFeature([Users])],
  exports :[UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserVehicle from 'src/relationshipEntities/UserVehicle.entity';
import { UsersModule } from 'src/users/users.module';
import { VehiclesController } from './vehicles.controller';
import { VehiclesRepository } from './vehicles.repository';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiclesRepository, UserVehicle]),
    UsersModule,
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule { }

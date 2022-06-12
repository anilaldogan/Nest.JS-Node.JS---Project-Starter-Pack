import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserVehicle from 'src/relationshipEntities/UserVehicle.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import { vehiclesDto } from './dto/vehicles.dto';
import { Vehicles } from './vehicles.entity';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(UserVehicle)
    private userVehicleRepository: Repository<UserVehicle>,
    private readonly vehiclesRepository: VehiclesRepository,
    private userService: UsersService,
    ) { }

  async getVehicles(): Promise<Vehicles[]> {
    return await this.vehiclesRepository.find();
  }

  async getVehicleById(id: string): Promise<Vehicles> {
    return await this.vehiclesRepository.findOne(id);
  }

  async createVehicle(vehiclesDto: vehiclesDto): Promise<Vehicles> {
    const newVehicle = new Vehicles();
    newVehicle.content = vehiclesDto.content;
    newVehicle.plate = vehiclesDto.plate;
    return await this.vehiclesRepository.save(newVehicle);
  }

  async updateVehicle(vehicle: Vehicles, vehiclesDto: vehiclesDto): Promise<Vehicles> {
    vehicle.content = vehiclesDto.content;
    vehicle.plate = vehiclesDto.plate;
    return await this.vehiclesRepository.save(vehicle);;
  }

  async deleteVehicle(vehicle: Vehicles): Promise<Vehicles> {
    return await this.vehiclesRepository.remove(vehicle);
  }

  async plateExists(plate: string): Promise<boolean> {
    const check = await this.vehiclesRepository.findOne({ plate });
    return !!check;
  }

  async assignVehicleToUser(vehicle: Vehicles, user: User): Promise<UserVehicle | null> {
    
    const existingVehicle = await this.userVehicleRepository.findOne({
      where: {
        vehicle: vehicle.id,
        user: user.id,
      },
    });

    if (existingVehicle) {
      return null;
    }

    const newUserVehicle = new UserVehicle();
    newUserVehicle.vehicle = vehicle;
    newUserVehicle.user = user;
    newUserVehicle.date = new Date();
    
    return await this.userVehicleRepository.save(newUserVehicle);
  }

  async getUserByID(id: string): Promise<User> {
    return await this.userService.findId(id);
  }
}

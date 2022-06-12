import { Injectable } from '@nestjs/common';
import { vehiclesDto } from './dto/vehicles.dto';
import { Vehicles } from './vehicles.entity';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) { }

  async getVehicles() {
    return await this.vehiclesRepository.find();
  }

  async getVehicleById(id: string) {
    return await this.vehiclesRepository.findOne(id);
  }

  async createVehicle(vehiclesDto: vehiclesDto) {
    const newVehicle = new Vehicles();
    newVehicle.content = vehiclesDto.content;
    newVehicle.plate = vehiclesDto.plate;
    return await this.vehiclesRepository.save(newVehicle);
  }

  async updateVehicle(vehicle: Vehicles, vehiclesDto: vehiclesDto) {
    vehicle.content = vehiclesDto.content;
    vehicle.plate = vehiclesDto.plate;
    return await this.vehiclesRepository.save(vehicle);;
  }

  async deleteVehicle(vehicle: Vehicles) {
    return await this.vehiclesRepository.remove(vehicle);
  }

  async plateExists(plate: string): Promise<boolean> {
    const check = await this.vehiclesRepository.findOne({ plate });
    return !!check;
  }
}

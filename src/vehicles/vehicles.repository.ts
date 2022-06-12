import { EntityRepository, Repository } from 'typeorm';
import { Vehicles } from './vehicles.entity';

@EntityRepository(Vehicles)
export class VehiclesRepository extends Repository<Vehicles> {}

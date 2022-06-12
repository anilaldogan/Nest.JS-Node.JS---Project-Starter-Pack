import { User } from 'src/users/user.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class UserVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, user => user.vehicles)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Vehicles, vehicle => vehicle.users)
  @JoinColumn()
  vehicle: Vehicles;
}

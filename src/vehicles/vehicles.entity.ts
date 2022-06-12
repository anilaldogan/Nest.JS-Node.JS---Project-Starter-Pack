import UserVehicle from 'src/relationshipEntities/UserVehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  plate: string;

  @Column()
  content: string;

  @Column()
  @CreateDateColumn()
  dateCreated: Date;

  @Column()
  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToMany(() => UserVehicle, userVehicle => userVehicle.vehicle)
  users: UserVehicle[];
}

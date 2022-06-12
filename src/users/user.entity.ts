import UserVehicle from 'src/relationshipEntities/UserVehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  dateCreated: Date;

  @Column()
  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToMany(() => UserVehicle, userVehicle => userVehicle.user, {
    cascade: true,
  })
  vehicles: UserVehicle[];
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './Department.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  hireDate: Date; // TODO: choose correct type based on selected Dates library?

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  @Column()
  phone: string;

  @Column()
  address: string;
}

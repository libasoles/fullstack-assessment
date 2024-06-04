import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee.entity';

// TODO: possibly add city, state, country
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @OneToOne(() => Employee)
  @JoinColumn()
  employee: Employee;
}

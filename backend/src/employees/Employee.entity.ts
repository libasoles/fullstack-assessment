import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../departments/Department.entity';

type ConstructorParams = {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: Date;
  department: Department;
  phone: string;
  address: string;
};

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'hire_date' })
  hireDate: Date; // TODO: choose correct type based on selected Dates library?

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column()
  phone: string;

  @Column()
  address: string; // TODO: grab address from Address entity

  constructor(params?: ConstructorParams) {
    if (params) Object.assign(this, params);
  }
}

import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
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

  @IsNotEmpty()
  @MaxLength(50)
  @Column({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @Column({ name: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @Column({ name: 'hire_date' })
  hireDate: Date;

  @IsNotEmpty()
  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @IsNotEmpty()
  @MaxLength(50)
  @Column()
  phone: string;

  @IsNotEmpty()
  @MaxLength(50)
  @Column()
  address: string;

  @IsBoolean()
  @Column({ name: 'is_active' })
  isActive: boolean;

  constructor(params?: ConstructorParams) {
    if (params) Object.assign(this, params);
  }
}

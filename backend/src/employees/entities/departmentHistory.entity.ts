import { IsNotEmpty } from 'class-validator';
import { Department } from 'src/departments/department.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

type ConstructorParams = {
  employeeId: number;
  departmentId: number;
  date: Date;
};

@Entity({ name: 'department_changes' })
export class DepartmentHistory {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: number;

  @PrimaryColumn({ name: 'department_id' })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn({ name: 'department_id' })
  @IsNotEmpty()
  department: Department;

  @Column('timestamp')
  date: Date;

  constructor(params?: ConstructorParams) {
    if (params) Object.assign(this, params);
  }
}
